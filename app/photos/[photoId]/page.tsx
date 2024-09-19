import Image from "next/image";
import Link from "next/link";

type Params = {
  params: {
    photoId: string;
  };
};

type Date = {
  year: string;
  month: string;
  day: string;
};

const Photo = async ({ params: { photoId } }: Params) => {
  const formatDate = (string: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(string).toLocaleDateString([], options);
  };

  const getPhotoData = async () => {
    const res = await fetch(
      `https://api.unsplash.com/photos/${photoId}/?client_id=8rdssbrJIi6CqglgutZRTRTc4TbR5bp3Mm62JvJ5gLM`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    return res.json();
  };

  const photoData: Photo = await getPhotoData();

  return (
    <>
      <div className="container photo-content p-10">
        <Link href="/">
          <button className="btn btn-primary my-6">Go Back</button>
        </Link>

        <div className="grid grid-cols-2 gap-4">
          <div>
            {photoData && (
              <Image
                src={photoData?.urls.full}
                alt={photoData?.description}
                width={500}
                height={300}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Photo;
