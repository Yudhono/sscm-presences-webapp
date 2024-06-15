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

interface IFormInput {
  created_at: string;
  event_date: string;
  name: string;
  status: string;
  instance?: string;
  participant_type: string;
  intention: string;
  intention_desc?: string;
}

export function CardWithForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      event_date: "",
      name: "",
      instance: "",
      status: "",
      participant_type: "",
      intention: "",
      intention_desc: "",
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
      "https://script.google.com/macros/s/AKfycby4bXVn8mskYJ0FdW0X-F-Pueo3PFhH_Zgc-EadfYd1axi59CgssIw2eumYT24TYzM9hQ/exec",
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
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input id="name" {...field} />}
              />
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
            </div>
            <div className="flex flex-col space-y-1.5">
              {status === "MAHASISWA" && (
                <>
                  <Label htmlFor="instance">Kampus</Label>
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
                </>
              )}
              {["OTHER_STATUS", "BEKERJA"].includes(status) && (
                <>
                  <Label htmlFor="instance">Instansi</Label>
                  <Controller
                    name="instance"
                    control={control}
                    render={({ field }) => <Input id="instance" {...field} />}
                  />
                </>
              )}
            </div>
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
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full">
            {isLoading ? (
              <>
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-5 h-5 text-gray-200 animate-spin dark:text-blue-600 fill-blue-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
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
