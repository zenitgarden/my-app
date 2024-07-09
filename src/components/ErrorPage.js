import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="h-screen flex items-center justify-center text-white flex-col gap-6">
        <h1 className="font-bold text-3xl">Opps! Page not found ...... !</h1>
        <p className="italic">Not found</p>
        <Link to={'/'} className="bg-white rounded text-slate-800 py-2 px-6 hover:bg-slate-300 transition-all duration-300">Back</Link>
    </div>
  );
}

export default ErrorPage;
