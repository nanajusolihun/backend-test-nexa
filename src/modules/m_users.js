import connection from "../utils/connectdb.js";

const getAllKaryawan = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM karyawan", (err, results) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(results);
      }
    });
  });
};

const checkNipKaryawan = (nip) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT nip, nama, alamat, gender, tanggal_lahir, image, created_at, updated_at FROM karyawan WHERE nip="${nip}"`, (err, result) => {
      if (!err) resolve(result);
      else reject(new Error(err));
    });
  });
};

const daftarKaryawan = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO karyawan SET?", data, (err, result) => {
      if (!err) resolve(result);
      else reject(new Error(err));
    });
  });
};

const detailNipKaryawan = (nip) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT nip, nama, alamat, gender, tanggal_lahir, image, created_at, updated_at FROM karyawan WHERE nip=${nip}`, (err, result) => {
      if (!err) resolve(result);
      else reject(new Error(err));
    });
  });
};

const updateKaryawan = (nip, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE karyawan SET? WHERE nip=${nip}`, data, (err, result) => {
      if (!err) resolve(result);
      else reject(new Error(err));
    });
  });
};

const deleteData = (nip) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM karyawan WHERE nip=${nip}`, (err, result) => {
      if (!err) resolve(result);
      else reject(new Error(err));
    });
  });
};

export { getAllKaryawan, daftarKaryawan, checkNipKaryawan, detailNipKaryawan, updateKaryawan, deleteData };
