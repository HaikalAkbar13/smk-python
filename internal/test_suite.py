"""
Test suite untuk memvalidasi latihan Python Lab Fungsi SMK Negeri 1 Bantaeng.
Dijalankan secara otomatis oleh lab.py setiap kali file latihan disimpan.
"""

import inspect
from dataclasses import dataclass
from typing import Any, Callable, List, Optional


@dataclass
class TestItem:
    description: str
    passed: bool
    expected: Optional[str] = None
    actual: Optional[str] = None
    hint: Optional[str] = None
    error: Optional[str] = None


def test_01_definisi(module) -> List[TestItem]:
    results = []

    # Tes 1: Cek apakah fungsi sapa_lab terdefinisi
    has_func = hasattr(module, "sapa_lab") and callable(getattr(module, "sapa_lab"))
    results.append(
        TestItem(
            description="Fungsi sapa_lab() terdefinisi dengan kata kunci def",
            passed=has_func,
            hint="Definisikan fungsi dengan: def sapa_lab():",
        )
    )
    if not has_func:
        return results

    # Tes 2: Parameter harus kosong (0 parameter)
    func = getattr(module, "sapa_lab")
    sig = inspect.signature(func)
    no_params = len(sig.parameters) == 0
    results.append(
        TestItem(
            description="Fungsi sapa_lab() tidak memerlukan parameter",
            passed=no_params,
            hint="Fungsi ini tidak memerlukan input apapun: def sapa_lab():",
        )
    )

    # Tes 3: Cek return value
    try:
        ret = func()
        expected = "Selamat Datang di Lab TJKT SMK Negeri 1 Bantaeng!"
        if ret is None:
            results.append(
                TestItem(
                    description="Fungsi mengembalikan teks sambutan (return string)",
                    passed=False,
                    expected=repr(expected),
                    actual="None",
                    hint="Pastikan kamu menggunakan kata kunci 'return', bukan hanya 'print()'!",
                )
            )
        elif not isinstance(ret, str):
            results.append(
                TestItem(
                    description="Fungsi mengembalikan tipe data string (str)",
                    passed=False,
                    expected="str",
                    actual=type(ret).__name__,
                    hint="Teks harus bertipe string dan dibungkus tanda kutip.",
                )
            )
        elif "SMK Negeri 1 Bantaeng" not in ret or "Lab" not in ret:
            results.append(
                TestItem(
                    description="Teks memuat 'Lab' dan 'SMK Negeri 1 Bantaeng'",
                    passed=False,
                    expected=repr(expected),
                    actual=repr(ret),
                    hint=f"Teks yang dikembalikan harus persis: '{expected}'",
                )
            )
        else:
            results.append(
                TestItem(
                    description="Fungsi mengembalikan teks sambutan yang tepat",
                    passed=True,
                )
            )
    except Exception as e:
        results.append(
            TestItem(
                description="Fungsi dapat dieksekusi tanpa error",
                passed=False,
                error=str(e),
            )
        )

    return results


def test_02_parameter(module) -> List[TestItem]:
    results = []

    has_func = hasattr(module, "buat_banner") and callable(
        getattr(module, "buat_banner")
    )
    results.append(
        TestItem(
            description="Fungsi buat_banner(hostname, ip) terdefinisi",
            passed=has_func,
            hint="Definisikan fungsi dengan: def buat_banner(hostname, ip):",
        )
    )
    if not has_func:
        return results

    func = getattr(module, "buat_banner")
    sig = inspect.signature(func)
    has_2_params = len(sig.parameters) >= 2
    results.append(
        TestItem(
            description="Fungsi menerima minimal 2 parameter (hostname, ip)",
            passed=has_2_params,
            hint="Pastikan ada 2 parameter di dalam kurung: (hostname, ip)",
        )
    )

    try:
        ret1 = func("MikroTik-Lab1", "192.168.1.1")
        expected1 = "[ROUTER] Hostname: MikroTik-Lab1 | IP: 192.168.1.1"

        if ret1 is None:
            results.append(
                TestItem(
                    description="Fungsi mengembalikan string berformat (return)",
                    passed=False,
                    expected=repr(expected1),
                    actual="None",
                    hint="Gunakan return f'[ROUTER] Hostname: {hostname} | IP: {ip}'",
                )
            )
        elif (
            "MikroTik-Lab1" in str(ret1)
            and "192.168.1.1" in str(ret1)
            and "[ROUTER]" in str(ret1)
        ):
            results.append(
                TestItem(
                    description="Banner terformat dengan benar untuk MikroTik-Lab1",
                    passed=True,
                )
            )
        else:
            results.append(
                TestItem(
                    description="Banner memuat '[ROUTER]', Hostname, dan IP",
                    passed=False,
                    expected=repr(expected1),
                    actual=repr(ret1),
                    hint=f"Format yang diharapkan: '{expected1}'",
                )
            )

        # Uji dengan input berbeda
        ret2 = func("Switch-Core", "10.0.0.254")
        has_dynamic = "Switch-Core" in str(ret2) and "10.0.0.254" in str(ret2)
        results.append(
            TestItem(
                description="Fungsi bekerja dinamis dengan parameter berbeda",
                passed=has_dynamic,
                hint="Pastikan kamu menggunakan variabel parameter hostname & ip di dalam teks, bukan tulisan hardcode!",
            )
        )
    except Exception as e:
        results.append(
            TestItem(
                description="Fungsi dapat dieksekusi tanpa error",
                passed=False,
                error=str(e),
            )
        )

    return results


def test_03_return_vs_print(module) -> List[TestItem]:
    results = []

    # Uji Fungsi 1: konversi_mb_ke_kb
    has_konversi = hasattr(module, "konversi_mb_ke_kb") and callable(
        getattr(module, "konversi_mb_ke_kb")
    )
    results.append(
        TestItem(
            description="Fungsi konversi_mb_ke_kb(mb) terdefinisi",
            passed=has_konversi,
            hint="Definisikan: def konversi_mb_ke_kb(mb):",
        )
    )

    if has_konversi:
        func1 = getattr(module, "konversi_mb_ke_kb")
        try:
            res1 = func1(1)
            res50 = func1(50)
            if res1 is None or res50 is None:
                results.append(
                    TestItem(
                        description="konversi_mb_ke_kb mengembalikan nilai angka (return)",
                        passed=False,
                        expected="51200",
                        actual="None",
                        hint="Gunakan return mb * 1024, jangan hanya print()!",
                    )
                )
            elif res1 == 1024 and res50 == 51200:
                results.append(
                    TestItem(
                        description="Perhitungan 1 MB = 1024 KB dan 50 MB = 51200 KB tepat",
                        passed=True,
                    )
                )
            else:
                results.append(
                    TestItem(
                        description="Hasil perkalian kuota MB ke KB tepat",
                        passed=False,
                        expected="51200 untuk input 50",
                        actual=str(res50),
                        hint="Rumus: return mb * 1024",
                    )
                )
        except Exception as e:
            results.append(
                TestItem(
                    description="konversi_mb_ke_kb berjalan tanpa error",
                    passed=False,
                    error=str(e),
                )
            )

    # Uji Fungsi 2: hitung_total_kb
    has_total = hasattr(module, "hitung_total_kb") and callable(
        getattr(module, "hitung_total_kb")
    )
    results.append(
        TestItem(
            description="Fungsi hitung_total_kb(kuota_list_mb) terdefinisi",
            passed=has_total,
            hint="Definisikan: def hitung_total_kb(kuota_list_mb):",
        )
    )

    if has_total and has_konversi:
        func2 = getattr(module, "hitung_total_kb")
        try:
            sample_list = [10, 20, 30]  # total 60 MB -> 61440 KB
            total_res = func2(sample_list)
            if total_res == 61440:
                results.append(
                    TestItem(
                        description="hitung_total_kb menjumlahkan list dan mengembalikan nilai KB",
                        passed=True,
                    )
                )
            else:
                results.append(
                    TestItem(
                        description="Perhitungan total kuota list tepat",
                        passed=False,
                        expected="61440 untuk list [10, 20, 30]",
                        actual=str(total_res),
                        hint="Jumlahkan semua MB di dalam list, lalu konversikan ke KB menggunakan fungsi konversi_mb_ke_kb!",
                    )
                )
        except Exception as e:
            results.append(
                TestItem(
                    description="hitung_total_kb berjalan tanpa error",
                    passed=False,
                    error=str(e),
                )
            )

    return results


def test_04_default_parameter(module) -> List[TestItem]:
    results = []

    has_func = hasattr(module, "koneksi_ssh") and callable(
        getattr(module, "koneksi_ssh")
    )
    results.append(
        TestItem(
            description="Fungsi koneksi_ssh terdefinisi",
            passed=has_func,
            hint="Definisikan: def koneksi_ssh(host, port=22, timeout=10):",
        )
    )
    if not has_func:
        return results

    func = getattr(module, "koneksi_ssh")
    sig = inspect.signature(func)

    # Periksa nilai default
    has_port_def = (
        "port" in sig.parameters and sig.parameters["port"].default == 22
    )
    has_timeout_def = (
        "timeout" in sig.parameters and sig.parameters["timeout"].default == 10
    )

    results.append(
        TestItem(
            description="Parameter port memiliki default value 22",
            passed=has_port_def,
            hint="Tuliskan port=22 pada definisi parameter fungsi",
        )
    )
    results.append(
        TestItem(
            description="Parameter timeout memiliki default value 10",
            passed=has_timeout_def,
            hint="Tuliskan timeout=10 pada definisi parameter fungsi",
        )
    )

    try:
        # Panggilan 1: Hanya mengirim host (memakai default port=22, timeout=10)
        res1 = func("192.168.1.1")
        exp1 = "ssh://192.168.1.1:22?timeout=10s"
        pass_res1 = res1 == exp1
        results.append(
            TestItem(
                description="Bisa dipanggil hanya dengan 1 argumen host (memakai nilai default)",
                passed=pass_res1,
                expected=repr(exp1),
                actual=repr(res1),
                hint=f"Format yang diharapkan: '{exp1}'",
            )
        )

        # Panggilan 2: Mengirim port custom (port=2222)
        res2 = func("10.0.0.1", port=2222, timeout=30)
        exp2 = "ssh://10.0.0.1:2222?timeout=30s"
        pass_res2 = res2 == exp2
        results.append(
            TestItem(
                description="Bisa dipanggil dengan port & timeout kustom",
                passed=pass_res2,
                expected=repr(exp2),
                actual=repr(res2),
                hint=f"Format yang diharapkan: '{exp2}'",
            )
        )
    except Exception as e:
        results.append(
            TestItem(
                description="Fungsi dapat dieksekusi tanpa error",
                passed=False,
                error=str(e),
            )
        )

    return results


def test_05_validasi_logika(module) -> List[TestItem]:
    results = []

    has_func = hasattr(module, "validasi_port") and callable(
        getattr(module, "validasi_port")
    )
    results.append(
        TestItem(
            description="Fungsi validasi_port(port) terdefinisi",
            passed=has_func,
            hint="Definisikan: def validasi_port(port):",
        )
    )
    if not has_func:
        return results

    func = getattr(module, "validasi_port")

    try:
        # Port valid (1 s/d 65535)
        res_80 = func(80)
        res_443 = func(443)
        res_1 = func(1)
        res_65535 = func(65535)
        all_valid = all(
            [
                res_80 is True,
                res_443 is True,
                res_1 is True,
                res_65535 is True,
            ]
        )

        results.append(
            TestItem(
                description="Mengembalikan True untuk port valid (1, 80, 443, 65535)",
                passed=all_valid,
                expected="True",
                actual=str(res_80),
                hint="Gunakan: if 1 <= port <= 65535: return True",
            )
        )

        # Port tidak valid (< 1 atau > 65535)
        res_0 = func(0)
        res_minus = func(-22)
        res_high = func(70000)
        all_invalid = all([res_0 is False, res_minus is False, res_high is False])

        results.append(
            TestItem(
                description="Mengembalikan False untuk port di luar jangkauan (0, -22, 70000)",
                passed=all_invalid,
                expected="False",
                actual=str(res_0),
                hint="Port di bawah 1 atau di atas 65535 harus mengembalikan False.",
            )
        )

        # Non-integer check
        res_str = func("80")
        is_type_safe = res_str is False
        results.append(
            TestItem(
                description="Mengembalikan False jika input bukan integer (contoh: string '80')",
                passed=is_type_safe,
                expected="False",
                actual=str(res_str),
                hint="Gunakan pengecekan tipe: if not isinstance(port, int): return False",
            )
        )
    except Exception as e:
        results.append(
            TestItem(
                description="Fungsi dapat menangani berbagai input tanpa crash",
                passed=False,
                error=str(e),
            )
        )

    return results


def test_06_fungsi_dengan_list(module) -> List[TestItem]:
    results = []

    has_func = hasattr(module, "filter_ip_aktif") and callable(
        getattr(module, "filter_ip_aktif")
    )
    results.append(
        TestItem(
            description="Fungsi filter_ip_aktif(daftar_perangkat) terdefinisi",
            passed=has_func,
            hint="Definisikan: def filter_ip_aktif(daftar_perangkat):",
        )
    )
    if not has_func:
        return results

    func = getattr(module, "filter_ip_aktif")

    try:
        sample_devices = [
            {"ip": "192.168.1.1", "status": "ONLINE"},
            {"ip": "192.168.1.2", "status": "OFFLINE"},
            {"ip": "192.168.1.3", "status": "ONLINE"},
            {"ip": "192.168.1.4", "status": "OFFLINE"},
        ]

        ret = func(sample_devices)
        expected = ["192.168.1.1", "192.168.1.3"]

        if ret is None:
            results.append(
                TestItem(
                    description="Fungsi mengembalikan list hasil filter (return list)",
                    passed=False,
                    expected=str(expected),
                    actual="None",
                    hint="Pastikan fungsi mengembalikan list baru yang berisi IP yang ONLINE!",
                )
            )
        elif not isinstance(ret, list):
            results.append(
                TestItem(
                    description="Fungsi mengembalikan tipe data list",
                    passed=False,
                    expected="list",
                    actual=type(ret).__name__,
                    hint="Buat list kosong hasil = [], lalu tambahkan IP dengan hasil.append(p['ip'])",
                )
            )
        elif ret == expected:
            results.append(
                TestItem(
                    description="Hanya menyaring IP yang berstatus 'ONLINE'",
                    passed=True,
                )
            )
        else:
            results.append(
                TestItem(
                    description="Daftar IP yang disaring tepat",
                    passed=False,
                    expected=str(expected),
                    actual=str(ret),
                    hint="Periksa apakah kamu mengambil nilai p['ip'] saat p['status'] == 'ONLINE'",
                )
            )

        # Uji dengan list kosong
        empty_ret = func([])
        results.append(
            TestItem(
                description="Menangani list kosong dengan mengembalikan []",
                passed=empty_ret == [],
                hint="Jika inputnya [], fungsi harus mengembalikan []",
            )
        )
    except Exception as e:
        results.append(
            TestItem(
                description="Fungsi berjalan tanpa error",
                passed=False,
                error=str(e),
            )
        )

    return results


def test_07_capstone(module) -> List[TestItem]:
    results = []

    # 1. hitung_rata_rata_latency
    has_avg = hasattr(module, "hitung_rata_rata_latency") and callable(
        getattr(module, "hitung_rata_rata_latency")
    )
    results.append(
        TestItem(
            description="Sub-fungsi hitung_rata_rata_latency(daftar_ms) terdefinisi",
            passed=has_avg,
            hint="Definisikan: def hitung_rata_rata_latency(daftar_ms):",
        )
    )

    if has_avg:
        func_avg = getattr(module, "hitung_rata_rata_latency")
        try:
            avg_val = func_avg([10, 20, 30])
            results.append(
                TestItem(
                    description="hitung_rata_rata_latency([10, 20, 30]) mengembalikan 20.0",
                    passed=avg_val == 20.0 or avg_val == 20,
                    expected="20.0",
                    actual=str(avg_val),
                    hint="Rumus rata-rata: sum(daftar_ms) / len(daftar_ms)",
                )
            )
        except Exception as e:
            results.append(
                TestItem(
                    description="hitung_rata_rata_latency berjalan tanpa error",
                    passed=False,
                    error=str(e),
                )
            )

    # 2. diagnosa_koneksi
    has_diag = hasattr(module, "diagnosa_koneksi") and callable(
        getattr(module, "diagnosa_koneksi")
    )
    results.append(
        TestItem(
            description="Sub-fungsi diagnosa_koneksi(avg_latency) terdefinisi",
            passed=has_diag,
            hint="Definisikan: def diagnosa_koneksi(avg_latency):",
        )
    )

    if has_diag:
        func_diag = getattr(module, "diagnosa_koneksi")
        try:
            d_cepat = func_diag(12.5) == "SANGAT CEPAT"
            d_stabil = func_diag(35.0) == "STABIL"
            d_lambat = func_diag(65.0) == "GANGGUAN"
            all_diag = d_cepat and d_stabil and d_lambat

            results.append(
                TestItem(
                    description="diagnosa_koneksi mengklasifikasikan: SANGAT CEPAT (<20), STABIL (<50), GANGGUAN (>=50)",
                    passed=all_diag,
                    hint="Gunakan if avg_latency < 20: 'SANGAT CEPAT' elif avg_latency < 50: 'STABIL' else: 'GANGGUAN'",
                )
            )
        except Exception as e:
            results.append(
                TestItem(
                    description="diagnosa_koneksi berjalan tanpa error",
                    passed=False,
                    error=str(e),
                )
            )

    # 3. laporan_kesehatan_jaringan (Fungsi Integrasi Puncak)
    has_lap = hasattr(module, "laporan_kesehatan_jaringan") and callable(
        getattr(module, "laporan_kesehatan_jaringan")
    )
    results.append(
        TestItem(
            description="Fungsi utama laporan_kesehatan_jaringan(nama_lab, daftar_ms) terdefinisi",
            passed=has_lap,
            hint="Definisikan: def laporan_kesehatan_jaringan(nama_lab, daftar_ms):",
        )
    )

    if has_lap and has_avg and has_diag:
        func_lap = getattr(module, "laporan_kesehatan_jaringan")
        try:
            report = func_lap("Lab TJKT 1", [15, 12, 18])
            is_dict = isinstance(report, dict)
            has_keys = is_dict and all(
                k in report for k in ["lab", "rata_rata_ms", "status"]
            )

            results.append(
                TestItem(
                    description="laporan_kesehatan_jaringan mengembalikan dictionary dengan key: 'lab', 'rata_rata_ms', 'status'",
                    passed=has_keys,
                    expected="dict dengan keys ['lab', 'rata_rata_ms', 'status']",
                    actual=str(list(report.keys())) if is_dict else str(report),
                    hint="Kembalikan: {'lab': nama_lab, 'rata_rata_ms': avg, 'status': status}",
                )
            )

            if has_keys:
                correct_values = (
                    report["lab"] == "Lab TJKT 1"
                    and (
                        report["rata_rata_ms"] == 15.0
                        or report["rata_rata_ms"] == 15
                    )
                    and report["status"] == "SANGAT CEPAT"
                )
                results.append(
                    TestItem(
                        description="Nilai laporan terintegrasi akurat (Lab TJKT 1, 15.0ms, SANGAT CEPAT)",
                        passed=correct_values,
                        hint="Gunakan hitung_rata_rata_latency dan diagnosa_koneksi di dalam laporan_kesehatan_jaringan!",
                    )
                )
        except Exception as e:
            results.append(
                TestItem(
                    description="laporan_kesehatan_jaringan berjalan tanpa error",
                    passed=False,
                    error=str(e),
                )
            )

    return results


# Registry mapping
TEST_REGISTRY = {
    "01_definisi_fungsi.py": (
        "Misi 1: Definisi & Anatomi Fungsi",
        test_01_definisi,
    ),
    "02_parameter_argumen.py": (
        "Misi 2: Parameter & Argumen Dinamis",
        test_02_parameter,
    ),
    "03_return_vs_print.py": (
        "Misi 3: Memahami Nilai Kembalian (return vs print)",
        test_03_return_vs_print,
    ),
    "04_default_parameter.py": (
        "Misi 4: Nilai Bawaan (Default Parameter)",
        test_04_default_parameter,
    ),
    "05_validasi_logika.py": (
        "Misi 5: Guard Clauses & Validasi dalam Fungsi",
        test_05_validasi_logika,
    ),
    "06_fungsi_dengan_list.py": (
        "Misi 6: Memproses & Memfilter List dengan Fungsi",
        test_06_fungsi_dengan_list,
    ),
    "07_capstone_fungsi.py": (
        "Misi 7 (CAPSTONE): Network Health Inspector Modular",
        test_07_capstone,
    ),
}
