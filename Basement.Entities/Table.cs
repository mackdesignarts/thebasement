namespace Basement.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Table
    {
        public int Id { get; set; }

        public int TableId { get; set; }

        [Required]
        public string CurrentDeck { get; set; }

        [Required]
        public string Players { get; set; }

        public bool IsFlop { get; set; }

        public bool IsTurn { get; set; }

        public bool IsRiver { get; set; }

        [Required]
        public string Flop { get; set; }

        [Required]
        public string Turn { get; set; }

        [Required]
        public string River { get; set; }

        public bool? IsActive { get; set; }
    }
}
