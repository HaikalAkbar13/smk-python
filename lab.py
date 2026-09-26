#!/usr/bin/env python3
"""
=============================================================================
🚀 PYTHON QUEST LAB: FUNGSI (FUNCTIONS)
SMK Negeri 1 Bantaeng - Teknik Jaringan Komputer & Telekomunikasi (TJKT)
=============================================================================
Interactive Auto-Watching Test Runner (Zero-Dependency)
Jalankan dengan: uv run lab.py (atau python3 lab.py)
"""

import importlib.util
import os
import sys
import time
import traceback
from pathlib import Path

# Import internal test suite
try:
    from internal.test_suite import TEST_REGISTRY, TestItem
except ImportError:
    # If running from another directory
    sys.path.insert(0, str(Path(__file__).parent))
    from internal.test_suite import TEST_REGISTRY, TestItem

# =============================================================================
# ANSI COLOR THEMES (Cyber-Terminal)
# =============================================================================
CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
PURPLE = "\033[95m"
BOLD = "\033[1m"
DIM = "\033[2m"
RESET = "\033[0m"

# Enable ANSI colors on Windows legacy terminals if needed
if os.name == "nt":
    os.system("color")


def clear_screen():
    """Membersihkan layar terminal secara mulus."""
    # ANSI clear screen + cursor home
    print("\033[2J\033[H", end="", flush=True)


def load_exercise_module(filepath: Path):
    """
    Memuat file latihan siswa secara dinamis & terisolasi.
    Mengembalikan (module, error_message).
    """
    module_name = filepath.stem
    try:
        spec = importlib.util.spec_from_file_location(module_name, filepath)
        if spec is None or spec.loader is None:
            return None, f"Tidak dapat memuat file: {filepath.name}"

        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module, None
    except SyntaxError as e:
        err = f"SyntaxError pada baris {e.lineno}:\n  {e.text and e.text.strip()}\n  {' ' * (e.offset or 1)}^ {e.msg}"
        return None, err
    except IndentationError as e:
        err = f"IndentationError (Kesalahan Spasi/Tab) pada baris {e.lineno}:\n  {e.text and e.text.strip()}\n  {e.msg}"
        return None, err
    except Exception as e:
        # Singkat traceback agar ramah pemula
        tb_lines = traceback.format_exception(type(e), e, e.__traceback__)
        # Ambil baris relevan dari file siswa
        relevant = [
            line for line in tb_lines if filepath.name in line or "Error" in line
        ]
        return None, "".join(relevant) or str(e)


def run_tests_for_exercise(filename: str, base_dir: Path):
    """Menjalankan test validator untuk satu file latihan."""
    title, validator = TEST_REGISTRY[filename]
    filepath = base_dir / "exercises" / filename

    if not filepath.exists():
        return False, [
            TestItem(
                description=f"File {filename} tidak ditemukan!",
                passed=False,
                hint=f"Pastikan file berada di folder exercises/{filename}",
            )
        ]

    module, error = load_exercise_module(filepath)
    if error:
        return False, [
            TestItem(
                description="Kode dapat dieksekusi tanpa error",
                passed=False,
                error=error,
            )
        ]

    try:
        results = validator(module)
        all_passed = len(results) > 0 and all(r.passed for r in results)
        return all_passed, results
    except Exception as e:
        return False, [
            TestItem(
                description="Terjadi error saat menjalankan fungsi penguji",
                passed=False,
                error=str(e),
            )
        ]


def print_header(current_idx: int, total_exercises: int, passed_count: int):
    """Menampilkan banner cyber terminal dan progress bar."""
    percent = int((passed_count / total_exercises) * 100)
    bar_width = 24
    filled = int((passed_count / total_exercises) * bar_width)
    bar = f"{GREEN}{'█' * filled}{DIM}{'░' * (bar_width - filled)}{RESET}"

    print(
        f"{CYAN}{BOLD}╔════════════════════════════════════════════════════════════════════════════╗{RESET}"
    )
    print(
        f"{CYAN}{BOLD}║   🚀 PYTHON QUEST: LAB FUNGSI (SMK NEGERI 1 BANTAENG)                      ║{RESET}"
    )
    print(
        f"{CYAN}{BOLD}║   Teknik Jaringan Komputer & Telekomunikasi (TJKT) • Mode Watcher          ║{RESET}"
    )
    print(
        f"{CYAN}{BOLD}╚════════════════════════════════════════════════════════════════════════════╝{RESET}"
    )

    print(
        f" Progres Belajar: [{bar}] {BOLD}{passed_count}/{total_exercises}{RESET} Misi ({percent}%)"
    )
    print(f"{DIM}{'─' * 76}{RESET}")


def render_exercise_view(
    filename: str,
    all_passed: bool,
    results: list,
    filepath: Path,
    last_mod_str: str,
):
    """Menampilkan detail latihan dan checklist hasil tes."""
    title, _ = TEST_REGISTRY[filename]

    status_badge = (
        f"{GREEN}{BOLD}🟢 SEMUA TES LOLOS!{RESET}"
        if all_passed
        else f"{RED}{BOLD}🔴 BELUM LENGKAP (PERLU DIPERBAIKI){RESET}"
    )

    print(f" {BOLD}Misi Aktif:{RESET} {CYAN}{BOLD}{title}{RESET}")
    print(
        f" {BOLD}Lokasi File:{RESET} {YELLOW}exercises/{filename}{RESET}  {DIM}(Terakhir diubah: {last_mod_str}){RESET}"
    )
    print(f" {BOLD}Status     :{RESET} {status_badge}\n")

    print(f" {BOLD}Rincian Pengujian Otomatis:{RESET}")
    for idx, test in enumerate(results, 1):
        if test.passed:
            print(f"   {GREEN}✔{RESET} [{idx}] {test.description}")
        else:
            print(f"   {RED}✖{RESET} [{idx}] {test.description}")

            if test.expected is not None and test.actual is not None:
                print(
                    f"       {DIM}↳ Diharapkan:{RESET} {GREEN}{test.expected}{RESET}"
                )
                print(
                    f"       {DIM}↳ Diterima  :{RESET} {RED}{test.actual}{RESET}"
                )

            if test.error:
                print(f"       {RED}{BOLD}↳ Pesan Error:{RESET}")
                for line in test.error.strip().split("\n"):
                    print(f"         {RED}{line}{RESET}")

            if test.hint:
                print(
                    f"       {YELLOW}💡 Petunjuk  : {DIM}{test.hint}{RESET}"
                )

    print()
    if all_passed:
        print(
            f" {GREEN}{BOLD}🎉 Luar biasa! Misi ini berhasil kamu selesaikan dengan sempurna.{RESET}"
        )
    else:
        print(
            f" {CYAN}👉 Buka file {YELLOW}exercises/{filename}{CYAN} di editor (VS Code/Nano),{RESET}"
        )
        print(
            f"    perbaiki kodenya, lalu tekan {BOLD}Ctrl + S (Save){RESET}. Terminal ini akan auto-reload!"
        )


def render_grand_victory(base_dir: Path):
    """Layar selebrasi kemenangan jika seluruh 7 misi telah tuntas."""
    clear_screen()
    print(
        f"""{YELLOW}{BOLD}
   ████████╗██████╗  ██████╗ ██████╗ ██╗  ██╗██╗   ██╗██╗
   ╚══██╔══╝██╔══██╗██╔═══██╗██╔══██╗██║  ██║╚██╗ ██╔╝██║
      ██║   ██████╔╝██║   ██║██████╔╝███████║ ╚████╔╝ ██║
      ██║   ██╔══██╗██║   ██║██╔═══╝ ██╔══██║  ╚██╔╝  ╚═╝
      ██║   ██║  ██║╚██████╔╝██║     ██║  ██║   ██║   ██╗
      ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝
    {RESET}"""
    )
    print(
        f"{GREEN}{BOLD}============================================================================{RESET}"
    )
    print(
        f"{GREEN}{BOLD}  SELAMAT! KAMU TELAH MENUNTASKAN SELURUH MODUL LAB FUNGSI PYTHON! 👑{RESET}"
    )
    print(
        f"{CYAN}{BOLD}  Siswa Hebat SMK Negeri 1 Bantaeng — Jurusan TJKT{RESET}"
    )
    print(
        f"{GREEN}{BOLD}============================================================================{RESET}\n"
    )

    print(
        f"{BOLD}Kompetensi Pemrograman yang Telah Kamu Kuasai:{RESET}\n"
        f"  {GREEN}✔{RESET} Membuat dan memanggil fungsi mandiri dengan kata kunci {CYAN}def{RESET}\n"
        f"  {GREEN}✔{RESET} Mengirim data dinamis menggunakan {CYAN}parameter & argumen{RESET}\n"
        f"  {GREEN}✔{RESET} Memahami perbedaan esensial antara {CYAN}return{RESET} vs {CYAN}print(){RESET}\n"
        f"  {GREEN}✔{RESET} Merancang fungsi fleksibel dengan {CYAN}default parameters (nilai bawaan){RESET}\n"
        f"  {GREEN}✔{RESET} Menerapkan validasi input dan {CYAN}guard clauses (keamanan port){RESET}\n"
        f"  {GREEN}✔{RESET} Memproses dan memfilter koleksi data {CYAN}List & Dictionary{RESET}\n"
        f"  {GREEN}✔{RESET} Membangun arsitektur perangkat lunak {CYAN}Modular (Capstone Network Inspector){RESET}\n"
    )
    print(
        f"{YELLOW}{BOLD}Terus asah kemampuan logikamu untuk menjadi Network & Software Specialist! 🚀{RESET}\n"
    )
    print(f"{DIM}Tekan Ctrl + C untuk keluar dari lab.{RESET}")


# =============================================================================
# MAIN RUNNER & WATCH LOOP
# =============================================================================
def main():
    base_dir = Path(__file__).parent.resolve()
    filenames = list(TEST_REGISTRY.keys())
    total_count = len(filenames)

    # Mode Non-Interactive (--check)
    if "--check" in sys.argv or "--test" in sys.argv:
        print(f"{CYAN}{BOLD}Menjalankan uji pemeriksaan seluruh latihan...{RESET}\n")
        all_ok = True
        for fname in filenames:
            title, _ = TEST_REGISTRY[fname]
            passed, results = run_tests_for_exercise(fname, base_dir)
            status_text = (
                f"{GREEN}PASSED ✔{RESET}" if passed else f"{RED}FAILED ✖{RESET}"
            )
            print(f"[{status_text}] {title} ({fname})")
            if not passed:
                all_ok = False
        sys.exit(0 if all_ok else 1)

    # Mode Interactive Watcher
    # Cari latihan pertama yang belum selesai
    current_idx = 0
    for idx, fname in enumerate(filenames):
        passed, _ = run_tests_for_exercise(fname, base_dir)
        if not passed:
            current_idx = idx
            break

    last_mtime = 0
    just_passed = False

    try:
        while True:
            # Hitung total yang sudah selesai
            passed_count = sum(
                1
                for fname in filenames
                if run_tests_for_exercise(fname, base_dir)[0]
            )

            # Jika semua 7 misi selesai, tampilkan selebrasi
            if passed_count == total_count:
                render_grand_victory(base_dir)
                time.sleep(1)
                continue

            current_filename = filenames[current_idx]
            current_filepath = base_dir / "exercises" / current_filename

            current_mtime = (
                current_filepath.stat().st_mtime
                if current_filepath.exists()
                else 0
            )

            # Re-run jika mtime berubah atau baru berpindah latihan
            if current_mtime != last_mtime or just_passed:
                last_mtime = current_mtime
                just_passed = False

                all_passed, results = run_tests_for_exercise(
                    current_filename, base_dir
                )
                mod_time_str = time.strftime(
                    "%H:%M:%S", time.localtime(current_mtime)
                )

                clear_screen()
                print_header(current_idx, total_count, passed_count)
                render_exercise_view(
                    current_filename,
                    all_passed,
                    results,
                    current_filepath,
                    mod_time_str,
                )

                # Jika latihan ini baru saja selesai lolos, tunggu 1.5 detik lalu lanjut ke misi berikutnya
                if all_passed:
                    time.sleep(1.8)
                    # Cari latihan berikutnya yang belum lolos
                    found_next = False
                    for next_idx in range(current_idx + 1, total_count):
                        if not run_tests_for_exercise(
                            filenames[next_idx], base_dir
                        )[0]:
                            current_idx = next_idx
                            just_passed = True
                            found_next = True
                            break

                    if not found_next:
                        # Cek dari awal jika ada yang terlewat
                        for next_idx in range(0, total_count):
                            if not run_tests_for_exercise(
                                filenames[next_idx], base_dir
                            )[0]:
                                current_idx = next_idx
                                just_passed = True
                                break

            time.sleep(0.3)

    except KeyboardInterrupt:
        print(f"\n\n{CYAN}Lab dihentikan. Sampai jumpa lagi di coding session berikutnya! 👋{RESET}")
        sys.exit(0)


if __name__ == "__main__":
    main()
