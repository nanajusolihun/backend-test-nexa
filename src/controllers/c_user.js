import { response } from "express";
import { getAllKaryawan, daftarKaryawan, checkNipKaryawan, detailNipKaryawan, updateKaryawan, deleteData } from "../modules/m_users.js";
import messages from "../utils/messages.js";
import fs from "fs";

// Melihat daftar karyawan
const allKaryawan = async (req, res) => {
  getAllKaryawan()
    .then((response) => {
      messages(res, 200, "Daftar semua karyawan", response);
    })
    .catch((err) => {
      messages(res, 500, err.message);
    });
};

// Mendaftarkan karyawan
const daftarKaryawanBaru = async (req, res) => {
  const body = req.body;
  const file = req.file;

  try {
    const check_Nip = await checkNipKaryawan(body.nip);

    if (file) {
      if (check_Nip.length) {
        const path = `./public/${file.filename}`;
        // delete file yg sudah terdaftar
        fs.unlinkSync(path);
        return messages(res, 400, "Nip sudah terdaftar");
      }

      const data = { ...body, image: file.filename };

      daftarKaryawan(data)
        .then((response) => {
          messages(res, 201, "Daftar Karyawan Baru Sukses");
        })
        .catch((err) => {
          messages(res, 500, err.message);
        });
    } else {
      messages(res, 400, "Fieled Image is Required");
    }
  } catch (error) {
    messages(res, 500, "Internal Server Error");
  }
};

// Mengedit data karyawan
const editKaryawan = (req, res) => {
  const nip = req.params.nip;
  const body = req.body;

  detailNipKaryawan(nip)
    .then((response) => {
      const checkNipKaryawan = response;
      if (!checkNipKaryawan.length) {
        return messages(res, 404, "Nip Karyawan Tidak ditemukan");
      }

      updateKaryawan(nip, body)
        .then((response) => {
          messages(res, 201, "Edit Data Karyawan Sukses");
        })
        .catch((err) => {
          messages(res, 500, err.message);
        });
    })
    .catch((err) => {
      messages(res, 500, "Internal Server Error");
    });
};

// Melihat detail data karyawan
const detailDataKaryawan = (req, res) => {
  const nip = req.params.nip;

  detailNipKaryawan(nip)
    .then((response) => {
      const checkNipKaryawan = response;
      if (!checkNipKaryawan.length) messages(res, 404, `Nip ${nip} tidak ditemukan`);

      messages(res, 200, "Detail Data Karyawan", response);
    })
    .then((err) => {
      messages(res, 500, "Internal Server Error");
    });
};

// Menonaktifkan atau menghapus data karyawan
const deleteDataKaryawan = (req, res) => {
  const nip = req.params.nip;

  deleteData(nip)
    .then((response) => {
      const checkNipKaryawan = response;
      if (!response.affectedRows) {
        return messages(res, 404, `Nip ${nip} tidak ditemukan`);
      }

      messages(res, 200, "Non-aktifkan karyawan sukses");
    })
    .then((err) => {
      messages(res, 500, "Internal Server Error");
    });
};

export { allKaryawan, daftarKaryawanBaru, editKaryawan, detailDataKaryawan, deleteDataKaryawan };
