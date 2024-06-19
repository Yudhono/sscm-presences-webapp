"use client";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import moment from "moment";
import Swal from "sweetalert2";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { DatePicker } from "@/src/components/ui/datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import LoadingSpinner from "./loading-spinner";

import { resolver } from "@/src/lib/form-resolvers";
import { IFormInput } from "@/src/lib/form-types";

export function CardWithForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: resolver,
    defaultValues: {
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      event_date: "",
      name: "",
      contact: "",
      instance: "",
      status: "",
      participant_type: "",
      intention: "",
      intention_desc: "",
      faculty_or_organitation: "",
    },
  });

  const [status, intention] = watch(["status", "intention"]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetch(
      "https://script.google.com/macros/s/AKfycbwjhve60fntU3Q8NqVDeAEftvAu5TZpcV-WeT_1k2AAU4R65YJb-1ddgqcmGgYjerbX4w/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Terimakasih",
          text: "Sampai bertemu di kegiatan selanjutnya ^_^",
          icon: "success",
        });
        setIsLoading(false);
        reset();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  console.log(8773123, "errors", errors);

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Save Street Child Malang</CardTitle>
          <CardDescription>Absensi Kegiatan SSCM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="datePicker">Tanggal Kegiatan</Label>
              <Controller
                name="event_date"
                control={control}
                render={({ field }) => (
                  <DatePicker date={field.value} setDate={field.onChange} />
                )}
              />
              {errors?.event_date?.type === "required" && (
                <p className="text-left text-red-500 font-normal text-sm">
                  {errors?.event_date?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input id="name" {...field} />}
              />
              {errors?.name?.type === "required" && (
                <p className="text-left text-red-500 font-normal text-sm">
                  {errors?.name?.message}
                </p>
              )}
              {errors?.name?.type === "minLength" && (
                <p className="text-left text-red-500 font-normal text-sm">
                  {errors?.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contact">Contact (WA/Sosial Media)</Label>
              <Controller
                name="contact"
                control={control}
                render={({ field }) => <Input id="contact" {...field} />}
              />
              {errors?.contact?.type === "required" && (
                <p className="text-left text-red-500 font-normal text-sm">
                  {errors?.contact?.message}
                </p>
              )}
              {errors?.contact?.type === "minLength" && (
                <p className="text-left text-red-500 font-normal text-sm">
                  {errors?.contact?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
                      <SelectItem value="BEKERJA">Bekerja</SelectItem>
                      <SelectItem value="OTHER_STATUS">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.status?.type === "required" && (
                <p className="text-left text-red-500 font-normal text-sm">
                  {errors?.status?.message}
                </p>
              )}
            </div>

            {status === "MAHASISWA" && (
              <>
                <Label htmlFor="instance" className="-mb-3">
                  Kampus
                </Label>
                <Controller
                  name="instance"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="instance">
                        <SelectValue placeholder="Pilih Kampus" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="UB">
                          Universitas Brawijaya Malang
                        </SelectItem>
                        <SelectItem value="UM">
                          Universitas Negeri Malang
                        </SelectItem>
                        <SelectItem value="UMM">
                          Universitas Muhammadiyah Malang
                        </SelectItem>
                        <SelectItem value="UIN">
                          Universitas Islam Negeri Malang
                        </SelectItem>
                        <SelectItem value="UNISMA">
                          Universitas Islam Malang
                        </SelectItem>
                        <SelectItem value="POLINEMA">
                          Polteknik Negeri Malang
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.instance?.type === "required" && (
                  <p className="text-left text-red-500 font-normal text-sm -mt-3">
                    {errors?.instance?.message}
                  </p>
                )}
              </>
            )}
            {["OTHER_STATUS", "BEKERJA"].includes(status) && (
              <>
                <Label htmlFor="instance" className="-mb-3">
                  Instansi
                </Label>
                <Controller
                  name="instance"
                  control={control}
                  render={({ field }) => <Input id="instance" {...field} />}
                />
                {errors?.instance?.type === "required" && (
                  <p className="text-left text-red-500 font-normal text-sm -mt-3">
                    {errors?.instance?.message}
                  </p>
                )}
                {errors?.instance?.type === "minLength" && (
                  <p className="text-left text-red-500 font-normal text-sm -mt-3">
                    {errors?.instance?.message}
                  </p>
                )}
              </>
            )}
            {["MAHASISWA"].includes(status) && (
              <>
                <Label htmlFor="faculty_or_organitation" className="-mb-3">
                  Fakultas/Organisasi
                </Label>
                <Controller
                  name="faculty_or_organitation"
                  control={control}
                  render={({ field }) => (
                    <Input id="faculty_or_organitation" {...field} />
                  )}
                />
                {errors?.faculty_or_organitation?.type === "required" && (
                  <p className="text-left text-red-500 font-normal text-sm -mt-3">
                    {errors?.faculty_or_organitation?.message}
                  </p>
                )}
                {errors?.faculty_or_organitation?.type === "minLength" && (
                  <p className="text-left text-red-500 font-normal text-sm -mt-3">
                    {errors?.faculty_or_organitation?.message}
                  </p>
                )}
              </>
            )}

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="participant_type">Datang sebagai?</Label>
              <Controller
                name="participant_type"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="CREW">Crew (Pengurus Inti)</SelectItem>
                      <SelectItem value="Volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.participant_type?.type === "required" && (
                <p className="text-left text-red-500 font-normal text-sm">
                  {errors?.participant_type?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="intention">Tujuan</Label>
              <Controller
                name="intention"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="event_volunteer">
                        Volunteer Kegiatan
                      </SelectItem>
                      <SelectItem value="interview">Wawancara</SelectItem>
                      <SelectItem value="survey_1">Survey 1</SelectItem>
                      <SelectItem value="survey_2">Survey 2</SelectItem>
                      <SelectItem value="survey_3">Survey 3</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.intention?.type === "required" && (
                <p className="text-left text-red-500 font-normal text-sm">
                  {errors?.intention?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              {intention === "other" && (
                <>
                  <Label htmlFor="intention_desc">
                    Deskripsikan Keperluan Anda
                  </Label>
                  <Controller
                    name="intention_desc"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Type your message here."
                      />
                    )}
                  />
                  {errors?.intention_desc?.type === "required" && (
                    <p className="text-left text-red-500 font-normal text-sm -mt-3">
                      {errors?.intention_desc?.message}
                    </p>
                  )}
                  {errors?.intention_desc?.type === "minLength" && (
                    <p className="text-left text-red-500 font-normal text-sm -mt-3">
                      {errors?.intention_desc?.message}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full">
            {isLoading ? (
              <>
                <LoadingSpinner />
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
