import express from "express";
import { allKaryawan, daftarKaryawanBaru, deleteDataKaryawan, detailDataKaryawan, editKaryawan } from "../controllers/c_user.js";
import uploadImage from "../middleware/upload_image.js";

const router = express.Router();

router.get("/allkaryawan", allKaryawan);
router.post("/daftarkaryawan", uploadImage, daftarKaryawanBaru);
router.put("/karyawan/edit/:nip", editKaryawan);
router.get("/karyawan/detail/:nip", detailDataKaryawan);
router.delete("/karyawan/delete/:nip", deleteDataKaryawan);

export default router;
