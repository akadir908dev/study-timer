interface AmbienceMixerProps {
  onNavigate: (view: string) => void;
  volumes: Record<string, number>;
  setVolumes: (volumes: Record<string, number>) => void;
}

export const SOUND_TRACKS = [
  { id: 'rain', label: 'Rain', url: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=heavy-rain-nature-sounds-8186.mp3' },
  { id: 'fire', label: 'Fireplace', url: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_677eb24b74.mp3?filename=crackling-fireplace-nature-sounds-8012.mp3' },
  { id: 'cafe', label: 'Coffee Shop', url: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_34190ba324.mp3?filename=restaurant-ambience-chatting-and-clinking-14389.mp3' },
  { id: 'waves', label: 'Ocean', url: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=ocean-waves-112906.mp3' },
];

export default function AmbienceMixer({ onNavigate, volumes, setVolumes }: AmbienceMixerProps) {
  const handleVolumeChange = (id: string, value: number) => {
    setVolumes({ ...volumes, [id]: value });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full w-full p-4">
      <h2 className="text-xl font-bold text-white mb-2">Ambience</h2>

      <div className="w-full flex flex-col gap-4 px-4 text-sm text-left">
        {SOUND_TRACKS.map(track => (
          <div key={track.id} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-white">{track.label}</label>
              <span className="text-white/70 text-xs">{Math.round(volumes[track.id] * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={volumes[track.id]}
              onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
              className="w-full cursor-pointer accent-blue-600"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors cursor-pointer"
          onClick={() => onNavigate("menu")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
