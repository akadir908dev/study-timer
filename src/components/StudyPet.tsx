interface StudyPetProps {
  status: 'sleeping' | 'studying' | 'happy';
}

export default function StudyPet({ status }: StudyPetProps) {
  let emoji = '😴';
  if (status === 'studying') emoji = '🤓';
  if (status === 'happy') emoji = '🥳';

  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <div className={`text-3xl transition-transform duration-300 ${status === 'studying' ? 'animate-bounce' : ''}`}>
        {emoji}
      </div>
    </div>
  );
}
