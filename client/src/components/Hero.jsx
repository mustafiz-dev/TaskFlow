import { Link } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";
function Hero() {
  return (
    <section className="min-h-[70vh]  rounded-lg flex items-center py-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Manage Tasks.
              <br />
              <span className="text-primary">
                Get Things Done.
              </span>
            </h1>

            <p className="mt-6 text-lg text-base-content/70 max-w-lg">
              Organize your work, track your progress, and stay productive
              with TaskFlow.
            </p>

            {/* Signup Form */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />

              <Link
                to="/register"
                className="btn btn-primary"
              >
                Sign Up for Free
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg ">
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