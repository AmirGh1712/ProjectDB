using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YAP.Objects
{
    public class Filter
    {
        // min & max for lat & long, min stars, list of strings of categories & city string
        private float longitude = -180;
        private float latitude = 180;
        private float radius = 10;

        public int stars { get; set; }
        public LinkedList<string> cats { get; set; }

        public Filter()
        {
            DefualtCats();
            stars = 0;
        }

        public Filter(int stars)
        {
            this.stars = stars;
            DefualtCats();
        }

        public Filter(float lati, float longi, float rad)
        {
            this.latitude = lati;
            this.longitude = longi;
            this.radius = Math.Min(rad, 10);
            DefualtCats();
            stars = 0;
        }
        public Filter(List<string> cats)
        {
            this.cats = new LinkedList<string>(cats);
            stars = 0;
        }

        public Filter(int stars, float lati, float longi, float rad)
        {
            this.latitude = lati;
            this.longitude = longi;
            this.radius = Math.Min(rad, 10);
            this.stars = stars;
            DefualtCats();
        }

        public Filter(int stars, List<string> cats)
        {
            this.stars = stars;
            this.cats = new LinkedList<string>(cats);
        }

        public Filter(float lati, float longi, float rad, List<string> cats)
        {
            this.latitude = lati;
            this.longitude = longi;
            this.radius = Math.Min(rad, 10);
            this.cats = new LinkedList<string>(cats);
            stars = 0;
        }

        public Filter(int stars, float lati, float longi, float rad, List<string> cats)
        {
            this.stars = stars;
            this.latitude = lati;
            this.longitude = longi;
            this.radius = Math.Min(rad, 10);
            this.cats = new LinkedList<string>(cats);
        }

        private void DefualtCats()
        {
            string[] words = {"see", "sleep", "buy", "eat", "drink", "do", "other", "go", "diplomatic-representation", "city", "learn", "silver",
            "around", "listing", "view", "vicinity", "mediumaquamarine", "island", "park", "red"};
            cats = new LinkedList<string>(words);
        }

        public string CreateCommand()
        {
            //SELECT * FROM places LEFT JOIN reviews ON places.idPlaces = reviews.idPlaces GROUP BY(places.idPlaces) HAVING AVG(COALESCE(stars, 0)) >= 0 ORDER BY AVG(stars) DESC;
            string command = "SELECT *, AVG(COALESCE(stars, 0)) AS avgstars FROM places LEFT JOIN reviews ON places.idPlaces = reviews.idPlaces";
            //if (stars != 0)
            //{
            //    command += " LEFT JOIN reviews ON places.idPlaces = reviews.idPlaces";
            //}
            command += " WHERE";
            command += " SQRT(POWER(latitude - " + latitude + ", 2) + POWER(longitude - " + longitude + ", 2)) <= " + radius;
            string res = "(" + string.Join(", ", cats.Select(s => $"'{s}'")) + ")";
            command += " AND category in " + res;
            command += " GROUP BY(places.idPlaces) HAVING AVG(COALESCE(stars, 0)) >= " + stars.ToString() + "  ORDER BY AVG(COALESCE(stars, 0)) DESC";  
            return command;
        }
    }
}
