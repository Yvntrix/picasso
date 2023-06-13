import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../components';
import { getRandomPrompt } from '../utils';
import toast from 'react-hot-toast';

interface Form {
  name: string;
  prompt: string;
  photo: string;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    name: '',
    prompt: '',
    photo: ''
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });

        await response.json();
        navigate('/');
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please enter a prompt and generate an image');
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/v1/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        });

        if (response.status === 500) {
          toast.error(
            'Your prompt contain inappropriate words that is not allowed by OpenAI, Please try other prompts.',
            {
              duration: 10000
            }
          );
          return;
        }

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toast.error('Enter a prompt first');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="h-5 w-5 text-yellow-400 font-bold text-3xl" aria-hidden="true">
              !
            </span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-yellow-800">Attention needed</h3>
            <div className="mt-2  text-yellow-700">
              <p>
                Unfortunately OpenAi Free token has expired, so you can't generate images for now.
                We are working on a solution. Sorry for the inconvenience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-extrabold text-gray-700 text-3xl">Create</h1>
        <p className="mt-2 text-gray-500 text-base ">
          Generate an imaginative image through OpenAI and share it with the community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a fortune-telling shiba inu reading your fate in a giant hamburger, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative self-center sm:self-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-90 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img
                src="./preview.png"
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <img src="./rings.svg" className="h-24 invert" />
              </div>
            )}
          </div>

          <div className="mt-5 flex gap-5">
            <button
              disabled
              // disabled={generatingImg || loading}
              type="button"
              onClick={generateImage}
              className=" text-white bg-emerald-400 hover:bg-emerald-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-300">
              {/* {generatingImg ? 'Generating...' : 'Generate'} */}
              Open AI is currently not available
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              Once you have created the image you want, you can share it with others in the
              community
            </p>
            <button
              disabled
              // disabled={generatingImg || loading}
              type="submit"
              className="mt-3 text-white  bg-emerald-400 hover:bg-emerald-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-300">
              {/* {loading ? 'Sharing...' : 'Share with the Community'}
               */}
              Open AI is currently not available
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
