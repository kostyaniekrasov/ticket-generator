import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  const { fullName, avatar, email, username, ticketId } = user;

  const date = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="px-4 pt-6 max-w-3xl flex flex-col items-center">
      <img
        src="images/logo-full.svg"
        className={'mb-6 h-7 xl:mb-10'}
        alt="Coding Conf Logo"
      />

      <h2
        className={
          'mb-3 text-center text-3xl xl:text-5xl xl:mb-5 font-extrabold text-white'
        }
      >
        Congrats,
        {fullName.split(' ').map((char: string) => (
          <p
            key={char}
            className="inline text-transparent bg-repeat bg-gradient-to-r from-[#ff4d4d] to-[#ffffff]
              bg-clip-text"
          >
            {` ${char}`}
          </p>
        ))}
        ! Your ticket is ready.
      </h2>

      <p
        className={'mb-4 xl:mb-16 xl:w-xl text-center text-xl text-neutral-300'}
      >
        We've emailed your ticket to &nbsp;
        <span className="text-orange-500">{email}</span>
        &nbsp; and will send updates in the run up to the event.
      </p>

      <div
        className="ticket p-4 xl:p-8 relative bg-contain bg-no-repeat
          bg-[url(images/pattern-ticket.svg')] flex justify-between w-xs xl:w-xl"
      >
        <div className="flex flex-col gap-6 xl:gap-16">
          <div className="flex gap-2 items-start">
            <img
              className="h-7 xl:h-10"
              src="images/logo-mark.svg"
              alt="logo"
            />
            <div>
              <p className="font-bold text-2xl xl:text-3xl leading-4 mb-2 xl:mb-6 text-neutral-0">
                Coding Conf
              </p>
              <p>{`${date} / Austin, TX`}</p>
            </div>
          </div>
          <div className="flex gap-2 xl:gap-4">
            <img
              src={URL.createObjectURL(avatar[0])}
              alt="avatar"
              className="w-12 object-cover h-12 xl:h-20 xl:w-20 rounded-sm"
            />
            <div className="flex flex-col">
              <p className="font-normal xl:text-2xl text-neutral-0 xl:mb-2">
                {fullName}
              </p>
              <div className="flex gap-1 items-center">
                <img
                  src="images/icon-github.svg"
                  alt="icon github"
                />
                <p className="text-neutral-300">@{username}</p>
              </div>
            </div>
          </div>
        </div>

        <p
          style={{
            writingMode: 'vertical-rl',
          }}
          className="text-center font-normal xl:text-3xl text-xl text-neutral-500"
        >
          #{ticketId}
        </p>
      </div>
    </div>
  );
};

export default TicketPage;
