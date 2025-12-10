import { Image } from '@mantine/core';
import { FC } from 'react';
import notfound from '@/assets/img/not-found.png';
const NoDataFound: FC = () => {
  return (
    <div>
      <div
        className={`flex flex-col justify-center items-center w-full min-h-[500px] px-5 `}
      >
        <Image radius="md" h={200} w={150} fit="contain" src={notfound} />
        <h2 className="font-bold pt-5">No Results Found</h2>
      </div>
    </div>
  );
};

export default NoDataFound;      
