import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";

function Hero() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register", {
      state: {
        email: email,
      },
    });
  };

  return (
    <section className="min-h-[70vh] flex items-center py-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-4xl lg:text-6xl font-bold leading-tight">
              Manage Tasks.
              <br />
              <span className="text-primary">
                Get Things Done.
              </span>
            </h1>

            <p className="md:mt-6 md:text-lg text-base-content/70 max-w-lg">
              Organize your work, track your progress, and stay productive
              with TaskFlow.
            </p>

            {/* Signup Form */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
              />

              <button
                type="button"
                onClick={handleSignUp}
                className="btn btn-primary whitespace-nowrap"
              >
                Sign Up for Free
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <img
                src={heroImage}
                alt="TaskFlow task management illustration"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;