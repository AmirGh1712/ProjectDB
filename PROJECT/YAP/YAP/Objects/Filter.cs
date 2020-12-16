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
        private int minlat = -90;
        private int maxlat = 90;
        private int minlong = -180;
        private int maxlong = 180;
        private int stars = 0;
        private LinkedList<string> cats;

        public Filter()
        {
            DefualtCats();
        }

        public Filter(int stars)
        {
            this.stars = stars;
            DefualtCats();
        }

        public Filter(int minlat, int maxlat, int minlong, int maxlong)
        {
            this.minlat = minlat;
            this.maxlat = maxlat;
            this.minlong = minlong;
            this.maxlong = maxlong;
            DefualtCats();
        }
        public Filter(List<string> cats)
        {
            this.cats = new LinkedList<string>(cats);
        }

        public Filter(int stars, int minlat, int maxlat, int minlong, int maxlong)
        {
            this.minlat = minlat;
            this.maxlat = maxlat;
            this.minlong = minlong;
            this.maxlong = maxlong;
            this.stars = stars;
            DefualtCats();
        }

        public Filter(int stars, List<string> cats)
        {
            this.stars = stars;
            this.cats = new LinkedList<string>(cats);
        }

        public Filter(int minlat, int maxlat, int minlong, int maxlong, List<string> cats)
        {
            this.minlat = minlat;
            this.maxlat = maxlat;
            this.minlong = minlong;
            this.maxlong = maxlong;
            this.cats = new LinkedList<string>(cats);
        }

        public Filter(int stars, int minlat, int maxlat, int minlong, int maxlong, List<string> cats)
        {
            this.stars = stars;
            this.minlat = minlat;
            this.maxlat = maxlat;
            this.minlong = minlong;
            this.maxlong = maxlong;
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
            string command = "SELECT * FROM places LEFT JOIN reviews ON places.idPlaces = reviews.idPlaces";
            //if (stars != 0)
            //{
            //    command += " LEFT JOIN reviews ON places.idPlaces = reviews.idPlaces";
            //}
            command += " WHERE";
            command += " latitude > " + minlat.ToString();
            command += " AND latitude < " + maxlat.ToString();
            command += " AND longitude > " + minlong.ToString();
            command += " AND longitude < " + maxlong.ToString();
            string res = "(" + string.Join(", ", cats.Select(s => $"'{s}'")) + ")";
            command += " AND category in " + res;
            command += " GROUP BY(places.idPlaces) HAVING AVG(COALESCE(stars, 0)) >= " + stars.ToString() + "  ORDER BY AVG(COALESCE(stars, 0)) DESC";  
            return command;
        }
    }
}
