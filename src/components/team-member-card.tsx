import Image from "next/image";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamMemberCard = ({ name, role, bio, image }: TeamMemberCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 sm:p-6 transition-all hover:shadow-md">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/10">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 96px, 128px"
        />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-center mb-1 text-foreground">{name}</h3>
      <p className="text-primary text-center mb-3 text-sm sm:text-base">{role}</p>
      <p className="text-muted-foreground text-center text-sm sm:text-base">{bio}</p>
    </div>
  );
};

export default TeamMemberCard; 