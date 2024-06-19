import { Resolver } from "react-hook-form";
import { IFormInput } from "../lib/form-types";

const resolver: Resolver<IFormInput> = async (values) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.event_date) {
    errors.event_date = {
      type: "required",
      message: "tanggal kegiatan wajib diisi",
    };
  }

  if (!values.name) {
    errors.name = { type: "required", message: "Nama Lengkap wajib diisi" };
  } else if (values.name.length <= 2) {
    errors.name = {
      type: "minLength",
      message: "nama lengkap wajib lebih dari 2 karakter",
    };
  }

  if (!values.contact) {
    errors.contact = { type: "required", message: "info kontak wajib diisi" };
  } else if (values.contact.length <= 2) {
    errors.contact = {
      type: "minLength",
      message: "info kontak wajib lebih dari 2 karakter",
    };
  }

  if (!values.status) {
    errors.status = { type: "required", message: "status wajib diisi" };
  } else {
    if (values.status === "MAHASISWA" && !values.instance) {
      errors.instance = {
        type: "required",
        message: "kampus wajib diisi",
      };
    }

    if (values.status === "MAHASISWA" && !values.faculty_or_organitation) {
      errors.faculty_or_organitation = {
        type: "required",
        message: "fakultas/organisasi wajib diisi",
      };
    } else if (
      values.status === "MAHASISWA" &&
      (values?.faculty_or_organitation?.length || 0) <= 5
    ) {
      errors.faculty_or_organitation = {
        type: "minLength",
        message: "fakultas/organisasi wajib lebih dari 5 karakter",
      };
    }

    if (
      ["OTHER_STATUS", "BEKERJA"].includes(values.status) &&
      !values.instance
    ) {
      errors.instance = { type: "required", message: "instansi wajib diisi" };
    } else if (
      ["OTHER_STATUS", "BEKERJA"].includes(values.status) &&
      (values?.instance?.length || 0) <= 5
    ) {
      errors.instance = {
        type: "minLength",
        message: "instansi wajib lebih dari 5 karakter",
      };
    }
  }

  if (!values.participant_type) {
    errors.participant_type = {
      type: "required",
      message: "kategori volunteer wajib diisi",
    };
  }

  if (!values.intention) {
    errors.intention = { type: "required", message: "tujuan wajib diisi" };
  } else if (values.intention === "other" && !values.intention_desc) {
    errors.intention_desc = {
      type: "required",
      message: "detail tujuan wajib diisi",
    };
  } else if (
    values.intention === "other" &&
    (values?.intention_desc?.length || 0) <= 10
  ) {
    errors.intention_desc = {
      type: "minLength",
      message: "detail tujuan wajib lebih dari 10 karakter",
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors: errors,
  };
};

export { resolver };
