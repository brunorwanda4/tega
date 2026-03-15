import GoBackButton from "@/components/common/go-back-button";
import VerifyEmailForm from "./_components/verify-email-form";

const VerifyEmail = () => {
  return (
    <div>
      <GoBackButton />
      <div className=" text-center gap-4 flex flex-col">
        <h3 className=" font-semibold text-3xl ">Verify Code</h3>
        <p className=" text-neutral text-sm">
          Please enter the code we just sent to <br />
           email
        </p>
      </div>
<VerifyEmailForm />
    </div>
  );
};

export default VerifyEmail;
