using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basement.Library
{
    public class ShuffleDeck
    {

        // deck array 
        private int[] _deck;

        public int[] Deck
        {
            get { return _deck; }
            set { _deck = value; }
        }
        
        private enum SUIT
        {
            hearts,     // hearts = 0
            diamonds,   // diamonds = 1
            clubs,      // clubs = 2
            spades      // spades = 3
        };

        // Shuffle deck constructor
        public ShuffleDeck()
        {
            int[] cards = new int[52];
            Random rnd = new Random();
            int temp;
            bool dupeCheck;
            bool dupe;

            for (int i = 0; i < cards.Length; i++)
            {
                do
                {
                    dupeCheck = true;
                    dupe = false;
                    temp = rnd.Next(1, cards.Length + 1);
                    for (int j = 0; j < cards.Length; j++)
                    {
                        if (temp == cards[j])
                        {
                            dupe = true;
                        }
                    }
                    if (dupe == false)
                    {
                        cards[i] = temp;
                        dupeCheck = false;
                    }
                } while (dupeCheck);
            }
            _deck = cards;
        }

        // Assign rank and suit to _deck[cardNumber]
        public List<KeyValuePair<string, int>> assignRankAndSuit(int cardNumber)
        {
            int rank = 0;
            int suit = 0;
            int number = _deck[cardNumber];

            if (number < 14)
            {
                suit = (int)SUIT.hearts;
                rank = number;
            }
            else if (number >= 14 && number < 27)
            {
                suit = (int)SUIT.diamonds;
                rank = number - 13;
            }
            else if (number >= 27 && number < 40)
            {
                suit = (int)SUIT.clubs;
                rank = number - 26;
            }
            else if (number >= 40)
            {
                suit = (int)SUIT.spades;
                rank = number - 39;
            }

            var rankAndSuit = new List<KeyValuePair<string, int>>();
            rankAndSuit.Add(new KeyValuePair<string, int>("rank", rank));
            rankAndSuit.Add(new KeyValuePair<string, int>("suit", suit));
            rankAndSuit.Add(new KeyValuePair<string, int>("number", number));

            return rankAndSuit;
        }

    }
}
