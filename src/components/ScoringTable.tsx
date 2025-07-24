import { BASE_SCORES } from '../constants/scoring';
import { Level } from '../types/game';

const LEVELS: Level[] = [6, 7, 8, 9, 10];
const SUITS = ['♠️', '♣️', '♦️', '♥️', 'No-Trump'] as const;

export default function ScoringTable() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Scoring Reference</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100 text-left text-sm font-bold text-gray-700 rounded-tl-2xl">
                Level
              </th>
              {SUITS.map((suit, index) => (
                <th
                  key={suit}
                  className={`px-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100 text-left text-sm font-bold text-gray-700 ${index === SUITS.length - 1 ? 'rounded-tr-2xl' : ''}`}
                >
                  {suit}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((level, levelIndex) => (
              <tr
                key={level}
                className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
              >
                <td className="px-4 py-3 text-sm font-bold text-gray-800 bg-gray-50">
                  {level}
                </td>
                {SUITS.map((suit) => {
                  const baseScore = BASE_SCORES[suit];
                  const score = baseScore + ((level - 6) * 100);
                  return (
                    <td
                      key={suit}
                      className="px-4 py-3 text-sm font-medium text-gray-700"
                    >
                      {score}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
            <div className="font-bold text-amber-800">Misere: <span className="text-amber-900">{BASE_SCORES['Misere']} points</span></div>
            <div className="text-xs text-amber-700 mt-1">Higher than 7, lower than 8. Can only bid after someone bids 7.</div>
          </div>
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-200">
            <span className="font-bold text-red-800">Open Misere:</span>
            <span className="ml-2 font-bold text-red-900">{BASE_SCORES['Open Misere']} points</span>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <p className="text-sm font-medium text-blue-800">
            Non-bidding team earns 10 points per trick won
          </p>
        </div>
      </div>
      
      {/* Joker Rules Section */}
      <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🃏</span>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent">
            Joker Rules
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-white bg-opacity-60 rounded-xl border border-purple-100">
            <h4 className="font-bold text-purple-800 mb-2">Trump Suit Contract</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>a)</strong> When there is a Trump Suit Contract, the joker belongs to that suit and becomes the highest trump card. 
              It must be played if necessary to follow suit and can be played even if you have suit cards still in your hand.
            </p>
          </div>
          
          <div className="p-4 bg-white bg-opacity-60 rounded-xl border border-purple-100">
            <h4 className="font-bold text-purple-800 mb-2">No Trump Contract</h4>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                <strong>b)</strong> In a No Trump Contract, the joker is a suit by itself, but is also the highest card of any suit and wins any trick in which it is legally played.
              </p>
              <p>
                <strong>c)</strong> In a No Trump Contract, the holder of the joker cannot play it if they can follow suit to the led suit. 
                The joker can only be used to trump in if the player holding the joker does not have any of the suit led.
              </p>
              <p>
                <strong>d)</strong> In a No Trump Contract, if the player leads the joker, they must specify the suit that others must play to, but the joker wins the trick.
              </p>
              <p>
                <strong>e)</strong> In a No Trump Contract, a player can lead the joker, and specify a suit, even if the player is holding cards still in their hand of that suit.
              </p>
              <p>
                <strong>f)</strong> In a No Trump Contract, the player holding the joker may lay off a led suit and use the joker later on to trump in on that same suit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bidding Rules Section */}
      <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📢</span>
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent">
            Bidding Rules
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-white bg-opacity-60 rounded-xl border border-green-100">
            <h4 className="font-bold text-green-800 mb-3">Re-entering Bidding</h4>
            <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <p><strong>When someone changes suit:</strong> You can ALWAYS re-enter bidding, even if you passed before</p>
              <p><strong>When someone increases their bid:</strong> You can ALWAYS re-enter bidding</p>
              <p><strong>Once you re-enter:</strong> Normal bidding rules apply - each bid must be higher value than the current bid</p>
            </div>
          </div>
          
          <div className="p-4 bg-white bg-opacity-60 rounded-xl border border-green-100">
            <h4 className="font-bold text-green-800 mb-3">Changing Your Own Bid</h4>
            <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <p><strong>If others have bid against you:</strong> You can change suit once OR increase your bid once</p>
              <p><strong>If you're the only bidder:</strong> You can only increase (not change suit) and only once</p>
              <p><strong>After you change/increase:</strong> Others get a chance to re-enter bidding</p>
              <p><strong>If nobody re-enters:</strong> Your changed/increased bid stands as the contract</p>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
            <p className="text-sm font-medium text-green-800 text-center">
              💡 <strong>Key Principle:</strong> Bid changes and increases give everyone a fresh opportunity to participate in the bidding
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}