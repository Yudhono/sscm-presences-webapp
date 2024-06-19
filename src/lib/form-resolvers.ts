import { Resolver } from "react-hook-form";
import { IFormInput } from "../lib/form-types";

type ValidationError = { type: string; message: string };
type ValidationRule<T> = (values: T) => ValidationError | null;

const required =
  <T>(field: keyof T, message: string): ValidationRule<T> =>
  (values) => {
    return !values[field] ? { type: "required", message } : null;
  };

const isString = (value: any): value is string => typeof value === "string";

const minLength =
  <T>(field: keyof T, min: number, message: string): ValidationRule<T> =>
  (values) => {
    const value = values[field];
    return value && isString(value) && value.length <= min
      ? { type: "minLength", message }
      : null;
  };

const conditionalRequired =
  <T>(
    condition: (values: T) => boolean,
    field: keyof T,
    message: string
  ): ValidationRule<T> =>
  (values) => {
    return condition(values) && !values[field]
      ? { type: "required", message }
      : null;
  };

const conditionalMinLength =
  <T>(
    condition: (values: T) => boolean,
    field: keyof T,
    min: number,
    message: string
  ): ValidationRule<T> =>
  (values) => {
    const value = values[field];
    return condition(values) && value && isString(value) && value.length <= min
      ? { type: "minLength", message }
      : null;
  };

const validations: Record<keyof IFormInput, ValidationRule<IFormInput>[]> = {
  created_at: [],
  event_date: [required("event_date", "tanggal kegiatan wajib diisi")],
  name: [
    required("name", "Nama Lengkap wajib diisi"),
    minLength("name", 2, "nama lengkap wajib lebih dari 2 karakter"),
  ],
  contact: [
    required("contact", "info kontak wajib diisi"),
    minLength("contact", 2, "info kontak wajib lebih dari 2 karakter"),
  ],
  status: [required("status", "status wajib diisi")],
  instance: [
    required("instance", "kampus wajib diisi"),
    conditionalRequired(
      (values) => values.status === "MAHASISWA",
      "instance",
      "kampus wajib diisi"
    ),
    conditionalRequired(
      (values) => ["OTHER_STATUS", "BEKERJA"].includes(values.status),
      "instance",
      "instansi wajib diisi"
    ),
    conditionalMinLength(
      (values) => ["OTHER_STATUS", "BEKERJA"].includes(values.status),
      "instance",
      5,
      "instansi wajib lebih dari 5 karakter"
    ),
  ],
  participant_type: [
    required("participant_type", "kategori volunteer wajib diisi"),
  ],
  intention: [required("intention", "tujuan wajib diisi")],
  intention_desc: [
    conditionalRequired(
      (values) => values.intention === "other",
      "intention_desc",
      "detail tujuan wajib diisi"
    ),
    conditionalMinLength(
      (values) => values.intention === "other",
      "intention_desc",
      10,
      "detail tujuan wajib lebih dari 10 karakter"
    ),
  ],
  faculty_or_organitation: [
    conditionalRequired(
      (values) => values.status === "MAHASISWA",
      "faculty_or_organitation",
      "fakultas/organisasi wajib diisi"
    ),
    conditionalMinLength(
      (values) => values.status === "MAHASISWA",
      "faculty_or_organitation",
      5,
      "fakultas/organisasi wajib lebih dari 5 karakter"
    ),
  ],
};

const resolver: Resolver<IFormInput> = async (values) => {
  const errors: Record<string, ValidationError> = {};

  (Object.keys(validations) as (keyof IFormInput)[]).forEach((field) => {
    validations[field].forEach((validate) => {
      const error = validate(values);
      if (error) {
        errors[field as string] = error;
        // Stop further validation for this field if an error is found
        return;
      }
    });
  });

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

export { resolver };
