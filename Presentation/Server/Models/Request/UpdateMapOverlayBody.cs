﻿namespace Server.Models.Request
{
    public class UpdateMapOverlayBody
    {
        public int FloorNumber { get; set; }
        public int ZIndex { get; set; }
        public string Name { get; set; }
    }
}