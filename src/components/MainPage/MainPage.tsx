import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconInfo } from '@/assets';
import { useDropzone, FileRejection } from 'react-dropzone';
import classNames from 'classnames';

interface FormInputs {
  avatar: FileList | null;
  fullName: string;
  email: string;
  username: string;
}

const MainPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<FormInputs>();

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setSelectedFile(file);
      setAvatarError(null);
      const fileList = new DataTransfer();
      fileList.items.add(file);
      setValue('avatar', fileList.files, { shouldValidate: true });
    }
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach((file) => {
      const error = file.errors[0];
      if (error.code === 'file-too-large') {
        setAvatarError('File too large. Please upload a photo under 500KB.');
      } else if (error.code === 'file-invalid-type') {
        setAvatarError('Please upload an image file (JPG, PNG, etc.).');
      } else {
        setAvatarError('Invalid file. Please try again.');
      }
      setSelectedFile(null);
      setValue('avatar', null, { shouldValidate: true });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { 'image/*': [] },
    maxSize: 500 * 1024,
  });

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setAvatarError(null);
    setValue('avatar', null, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (avatarError) {
      return;
    }

    const randomFiveNumber = Math.floor(10000 + Math.random() * 90000);
    navigate('ticket', {
      state: { user: { ...data, ticketId: randomFiveNumber } },
    });
  };

  const file = watch('avatar');

  useEffect(() => {
    if (!selectedFile && isSubmitted) {
      setAvatarError('Avatar is required');
    }
  }, [selectedFile, isSubmitted]);

  return (
    <div className="px-4 pt-6 max-w-3xl flex flex-col items-center">
      <img
        src="images/logo-full.svg"
        className={'mb-6 h-7 xl:mb-10'}
        alt="Coding Conf Logo"
      />

      <h2
        className={
          'mb-3 text-center text-3xl xl:text-5xl font-extrabold text-white'
        }
      >
        Your Journey to Coding Conf 2025 Starts Here!
      </h2>

      <p className={'mb-4 text-center text-xl text-neutral-300 xl:mb-8'}>
        Secure your spot at next year's biggest coding conference.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col w-full sm:w-sm xl:w-md'}
      >
        <fieldset className="flex w-full flex-col gap-2 mb-8 relative">
          <label
            htmlFor="file"
            className="text-xl text-neutral-20"
          >
            Upload Avatar
          </label>
          <div
            {...getRootProps()}
            className={classNames(
              `items-center rounded-xl border border-dashed border-neutral-300
              bg-neutral-500/20 focus:outline-2 focus:outline-neutral-500
              focus:outline-offset-4 hover:bg-neutral-700/70 transition-all`,
              {
                'border-orange-500': isDragActive,
              },
            )}
          >
            <input {...getInputProps()} />
            {!selectedFile && !file?.length && (
              <motion.div
                className="flex flex-col items-center gap-4 p-4 w-full"
                initial={{ display: 'none', opacity: 0, scale: 0 }}
                animate={{ display: 'flex', opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                exit={{ display: 'none' }}
              >
                <img
                  src="images/icon-upload.svg"
                  className={
                    'flex cursor-pointer rounded-xl border border-neutral-700 bg-neutral-700/50 p-2'
                  }
                  alt="icon upload"
                />
                <p>Drag and drop or click to upload</p>
              </motion.div>
            )}

            {(selectedFile || (file && file.length > 0)) && (
              <motion.div
                className="flex flex-col items-center gap-4 p-4 w-full"
                initial={{ display: 'none', opacity: 0, scale: 0 }}
                animate={{ display: 'flex', opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                exit={{ display: 'none' }}
              >
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : URL.createObjectURL(file![0])
                  }
                  className={`flex cursor-pointer rounded-xl border border-neutral-700 bg-neutral-700/50 w-12
                  h-12`}
                  alt="uploaded avatar"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="bg-neutral-700/40 px-2 rounded-sm underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                  >
                    Remove image
                  </button>
                  <button
                    type="button"
                    className="bg-neutral-700/40 px-2 rounded-sm cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const input = document.getElementById(
                        'file',
                      ) as HTMLInputElement;
                      if (input) {
                        input.click();
                      }
                    }}
                  >
                    Change image
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            className="text-neutral-300 absolute -bottom-8 left-0 right-0 flex gap-2 items-center"
            animate={
              !avatarError && !selectedFile
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <IconInfo className="text-[#D1D0D5]" />
            <p className="text-xs">
              Upload your photo (JPG or PNG, max size: 500KB).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            className="text-orange-500 absolute -bottom-8 left-0 right-0 flex gap-2 items-center"
            animate={
              (!selectedFile && isSubmitted) || avatarError
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <IconInfo />
            <span className="text-sm">{avatarError}</span>
          </motion.div>
        </fieldset>

        <fieldset className="flex flex-col gap-7 z-10">
          <fieldset className="flex flex-col gap-2 self-start w-full relative">
            <label
              htmlFor="fullname"
              className="text-xl text-neutral-200 flex gap-2 items-center"
            >
              Full name
            </label>

            <input
              type="text"
              id="fullname"
              placeholder="name"
              className={classNames(
                `bg-neutral-500/20 rounded-xl p-3 border-neutral-500 border border-solid
                focus:outline-2 focus:outline-neutral-500 focus:outline-offset-4
                hover:bg-neutral-700/70 transition-all `,
                {
                  'border-orange-500': errors.fullName && isSubmitted,
                },
              )}
              {...register('fullName', { required: true })}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              className="text-orange-500 absolute -bottom-6 left-0 right-0 flex gap-2 items-center"
              animate={
                errors.fullName && isSubmitted
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: -10,
                    }
              }
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <IconInfo />
              <span className="text-sm">Fullname is required</span>
            </motion.div>
          </fieldset>

          <fieldset className="flex flex-col gap-2 self-start w-full relative">
            <label
              htmlFor="email"
              className="text-xl text-neutral-200 flex gap-2 items-center"
            >
              Email address
            </label>

            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              className={classNames(
                `bg-neutral-500/20 rounded-xl p-3 border-neutral-500 border border-solid
                focus:outline-2 focus:outline-neutral-500 focus:outline-offset-4
                hover:bg-neutral-700/70 transition-all `,
                {
                  'border-orange-500': errors.email && isSubmitted,
                },
              )}
              {...register('email', { required: true })}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              className="text-orange-500 absolute -bottom-6 left-0 right-0 flex gap-2 items-center"
              animate={
                errors.email && isSubmitted
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: -10,
                    }
              }
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <IconInfo />
              <span className="text-sm">Email is required</span>
            </motion.div>
          </fieldset>

          <fieldset className="flex flex-col gap-2 self-start w-full relative">
            <label
              htmlFor="username"
              className="text-xl text-neutral-200 flex gap-2 items-center"
            >
              GitHub Username
            </label>

            <input
              type="text"
              id="username"
              placeholder="@yourusername"
              className={classNames(
                `bg-neutral-500/20 rounded-xl p-3 border-neutral-500 border border-solid
                focus:outline-2 focus:outline-neutral-500 focus:outline-offset-4
                hover:bg-neutral-700/70 transition-all `,
                {
                  'border-orange-500': errors.username && isSubmitted,
                },
              )}
              {...register('username', { required: true })}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              className="text-orange-500 absolute -bottom-6 left-0 right-0 flex gap-2 items-center"
              animate={
                errors.username && isSubmitted
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: -10,
                    }
              }
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <IconInfo />
              <span className="text-sm">Username is required</span>
            </motion.div>
          </fieldset>

          <button
            id="button"
            type="submit"
            className="z-10 cursor-pointer bg-orange-500 p-3 rounded-xl text-neutral-900 font-extrabold
              text-xl focus:outline-2 focus:outline-neutral-500 focus:outline-offset-4"
          >
            Generate My Ticket
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default MainPage;
