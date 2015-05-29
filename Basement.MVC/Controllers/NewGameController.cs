using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Basement.Entities;
using Basement.Library;

namespace Basement.MVC.Controllers
{
    public class NewGameController : ApiController
    {
        private BasementDB db = new BasementDB();

        // POST api/NewGame
        [ResponseType(typeof(Table))]
        public IHttpActionResult PostTable(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // shuffle the deck
            ShuffleDeck Deck = new ShuffleDeck();
            int[] deck = Deck.Deck;

            // select table id
            int tabId = 1001;

            var table = db.Tables.SingleOrDefault(u => u.TableId == tabId);
            var players = table.Players;

            // init table
            table.CurrentDeck = "";
            table.IsFlop = false;
            table.IsTurn = false;
            table.IsRiver = false;
            table.Flop = "";
            table.Turn = "";
            table.River = "";
            table.IsActive = true;

            string json = @"{ 
                'CurrentDeck':  '',
                'IsFlop': 'false',
                'IsTurn': 'false',
                'IsRiver': 'false',
                'Flop': '',
                'Turn': '',
                'River': '',
                'IsActive': 'true'
                'Players': []
            }";

            JObject obj = JObject.Parse(json);
            JArray Players = (JArray)obj["Players"];
            JArray CurrentDeck = (JArray)obj["CurrentDeck"];

            Players.Add(user.UserName);
            Players.Add(user.Id); 
            

            return Ok(table);
        
        }

        // GET api/NewGame
        public IHttpActionResult GetTables()
        {
            ShuffleDeck Deck = new ShuffleDeck();
            int[] deck = Deck.Deck;
            return Ok(deck);
        }

        // GET api/NewGame/5
        [ResponseType(typeof(Table))]
        public IHttpActionResult GetTable(int id)
        {
            Table table = db.Tables.Find(id);
            if (table == null)
            {
                return NotFound();
            }

            return Ok(table);
        }

        // PUT api/NewGame/5
        public IHttpActionResult PutTable(int id, Table table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != table.Id)
            {
                return BadRequest();
            }

            db.Entry(table).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE api/NewGame/5
        [ResponseType(typeof(Table))]
        public IHttpActionResult DeleteTable(int id)
        {
            Table table = db.Tables.Find(id);
            if (table == null)
            {
                return NotFound();
            }

            db.Tables.Remove(table);
            db.SaveChanges();

            return Ok(table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TableExists(int id)
        {
            return db.Tables.Count(e => e.Id == id) > 0;
        }
    }
}