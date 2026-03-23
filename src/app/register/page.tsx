import RegisterForm from '@/components/forms/RegisterForm';

const RegisterPage: React.FC = () => {


  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-10 flex flex-col items-center justify-center">
     <RegisterForm></RegisterForm>
    </div>
  );
};

export default RegisterPage;