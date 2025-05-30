import clsxm from "@/lib/clsxm";
import Section1 from "../../components/section1";
import Section2 from "../../components/section2";
import Typography from "@/components/Typography/Typography";
import { useMultistepForm } from "@/components/Hooks/useMultiStepForm";
import Button from "@/components/Buttons";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { ref, getStorage, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase/init";
import * as Yup from "yup";
import { useState } from "react";
import { FileProvider } from "../../components/Hooks/useFormContext";
const registrationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  NRP: Yup.string()
    .required("NRP is required")
    .min(10, "NRP must be 10 digits")
    .max(10, "NRP must be 10 digits"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be digits only"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  batch: Yup.string().required("Batch is required"),
  curriculum_vitae: Yup.mixed().required("Curriculum Vitae is required"),
  ktm: Yup.mixed().required("KTM is required"),
  transcript_gpa: Yup.mixed().required("Transcript GPA is required"),
  motivation_letter: Yup.mixed().required("Motivation Letter is required"),
});

export default function Registration() {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setuploadedFiles] = useState<
    {
      [key: string]: File;
    }[]
  >([]);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const finalValues = { ...values };

    try {
      // Save basic form data to Firebase
      const storageRef = ref(storage, "oprec/");

      localStorage.setItem("oprec", JSON.stringify(finalValues));
      const UploadFilePromises = uploadedFiles.map(
        async (file: { [key: string]: File }) => {
          setLoading(true);
          const key = Object.keys(file)[0];
          const fileRef = ref(storageRef, `${key}/${finalValues.NRP}-${key}`);
          await uploadBytes(fileRef, file[key]);
          // console.log(UploadFilePromises, "uploaded");
        }
      );
      const docRef = await addDoc(collection(db, "oprec"), {
        full_name: finalValues.full_name,
        NRP: finalValues.NRP,
        phone_number: finalValues.phone_number,
        email: finalValues.email,
        batch: finalValues.batch,
      });
      setLoading(true);
      // const f = finalValues;
      // console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      // console.error(err);
      setLoading(false);
    }

    // Add uploaded files to the final values
    uploadedFiles?.forEach((file) => {
      const key = Object.keys(file)[0]; // Get the key (name) of the uploaded file
      finalValues[key] = file[key]; // Assign the file to the corresponding field
    });

    // Redirect after successful submission
    router.push("/oprec/Registration-Successful");
  };

  const setFileValueUtils = (x: { [key: string]: File | undefined }) => {
    const newFiles = [...uploadedFiles];
    const xkey = Object.keys(x)[0];

    // Find if the file already exists in the state
    const existingFileIndex = newFiles.findIndex(
      (file) => file[xkey] !== undefined
    );

    if (existingFileIndex > -1) {
      // Update the existing file
      newFiles[existingFileIndex][xkey] = x[xkey] as File;
    } else {
      // Add a new file
      newFiles.push({ [xkey]: x[xkey] as File });
    }

    setuploadedFiles(newFiles);
  };

  const { steps, step, next, prev, isFirstStep, isLastStep, currentStepIndex } =
    useMultistepForm([
      <Section1 key={1} />,
      <Section2 setUploadedFile={setFileValueUtils} key={2} />,
    ]);

  return (
    <div
      className={clsxm([
        "min-h-screen w-full h-full m-auto",
        "bg-primary-normal-normal py-10 md:py-0",
      ])}
    >
      <section className=" w-[90%] h-full min-h-screen flex flex-col justify-center items-center m-auto">
        <Formik
          initialValues={{
            full_name: "",
            NRP: "",
            phone_number: "",
            email: "",
            batch: "",
            curriculum_vitae: null,
            ktm: null,
            transcript_gpa: null,
            motivation_letter: null,
            statement_letter: null,
          }}
          validationSchema={registrationSchema}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, validateForm }) => (
            <Form>
              <Typography
                variant="Paragraph"
                size="sm"
                className="flex justify-end text-white"
              >
                {currentStepIndex + 1} / {steps.length}
              </Typography>

              {/* Menyediakan konteks file untuk komponen */}
              <FileProvider value={{ uploadedFiles, setuploadedFiles }}>
                {step}
              </FileProvider>

              <div className="flex justify-end gap-2">
                {!isFirstStep && (
                  <Button
                    variant="default"
                    size="small"
                    onClick={prev}
                    type="button"
                  >
                    Prev
                  </Button>
                )}

                {!isLastStep && (
                  <Button
                    variant="default"
                    size="small"
                    type="button"
                    onClick={next} // Only navigate to the next step
                  >
                    Next
                  </Button>
                )}

                {isLastStep && (
                  <Button
                    variant="default"
                    size="small"
                    type="submit" // Form submission is handled here
                  >
                    {loading ? "Loading...." : "Submit"}
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
