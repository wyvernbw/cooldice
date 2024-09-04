import RoomForm from "@/components/room-form";

const HomePage = () => {
  return (
    <main className="bg-orange-500 bg-opacity-50">
      <div className="flex min-h-screen flex-col items-start justify-center px-48 py-24 sm:py-32">
        <div className="h-max w-max rounded-lg bg-background p-8">
          <RoomForm />
        </div>
      </div>
    </main>
  );
};
export default HomePage;
