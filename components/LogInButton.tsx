import { useState } from "react";
import { createClient } from "@/utils/supabase/component";

const LogInButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error;
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    return error;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const error = isLogin ? await logIn() : await signUp();
      if (error) {
        setError(error.message);
      } else {
        setShowModal(false);
      }
    } catch (error) {
      setError(
        (error as Error).message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 p-2 bg-gray-800 text-white rounded-md">
        Log In
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
            <h2 className="text-xl font-bold mb-4">
              {isLogin ? "Log In" : "Sign Up"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-600">
                  {isLogin ? "Need an account?" : "Already have an account?"}
                </button>
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-4 py-2 rounded">
                  {isLogin ? "Log In" : "Sign Up"}
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LogInButton;
