import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";

const NewPoll = () => {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [expiryDate, setExpiryDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
      });

      return () => {
        data.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  const toggleForm = () => setShowForm(prev => !prev);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index: number) =>
    setOptions(options.filter((_, i) => i !== index));

  const handleCancel = () => {
    setQuestion("");
    setOptions([""]);
    setExpiryDate("");
    setSuccessMessage("");
    setErrorMessage("");
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (question.trim() && options.filter(opt => opt.trim()).length < 2) {
      setErrorMessage("Please provide a question and at least two options.");
      return;
    }

    const { data: poll, error: pollError } = await supabase
      .from("polls")
      .insert({
        question,
        expires_at: new Date(expiryDate).toISOString(),
        created_by: user?.id,
      })
      .select()
      .single();

    if (pollError) {
      console.error("Error creating poll:", pollError);
      setErrorMessage(pollError.message);
      return;
    }

    // Insert options
    const { error: optionsError } = await supabase.from("options").insert(
      options
        .filter(opt => opt.trim())
        .map(text => ({
          poll_id: poll.id,
          text,
        }))
    );

    if (!optionsError) {
      setSuccessMessage("Poll created successfully!");
      handleCancel();
    } else {
      console.error("Error creating options:", optionsError);
      setErrorMessage(optionsError.message);
    }
  };

  const labelStyle = "block font-medium text-gray-700";
  const inputStyle =
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 p-1";

  return (
    <section className="mb-16">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={toggleForm}
        className="text-2xl mb-4 flex items-center gap-2 p-2 text-gray-800 rounded-md font-semibold"
        title="Create New Poll">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-plus">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
        New Poll
      </button>

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md max-w-md">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md max-w-md">
          {errorMessage}
        </div>
      )}

      {/* Poll Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-white shadow-md rounded-md max-w-md">
          <div>
            <label className={labelStyle}>Poll Question</label>
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Enter the poll question"
              className={`mt-1 ${inputStyle}`}
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={option}
                  onChange={e => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className={inputStyle}
                  required
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 text-gray-500 hover:text-gray-700">
              + Add Option
            </button>
          </div>

          <div>
            <label className={labelStyle}>Expiration Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={e => setExpiryDate(e.target.value)}
              className={`mt-1 ${inputStyle}`}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:ring focus:ring-gray-100">
              Create Poll
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default NewPoll;
