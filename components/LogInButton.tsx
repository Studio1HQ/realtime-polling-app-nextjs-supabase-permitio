import { useState } from "react";
import { createClient } from "@/utils/supabase/component";

const LogInButton = () => {
  const supabase = createClient();

  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setShowModal(false);
    }
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: userName,
        },
      },
    });
    if (error) {
      setError(error.message);
    } else {
      setShowModal(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      await logIn();
    } else {
      await signUp();
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
            <h2 className="text-xl font-bold mb-4">
              {isLogin ? "Log In" : "Sign Up"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              )}

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
