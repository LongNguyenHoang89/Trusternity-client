using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication3
{
    class Program
    {
        static void Main(string[] args)
        {
            int count = 0;
            HashSet<Item> dataList = new HashSet<Item>();
            Queue<Item> last10 = new Queue<Item>(10);

            int streakDiff = 0;
            Dictionary<int, int> streakDiffList = new Dictionary<int, int>();

            int streakTime = 0;
            Dictionary<int, int> streakTimeList = new Dictionary<int, int>();

            string processFileName = "processed.csv";
            string processed = "";
            File.WriteAllText(processFileName, "block,diff,time,avg\n");

            foreach (var line in File.ReadLines("data.csv"))
            {
                count++;
                if (count == 1) continue; //skip header

                String[] data = line.Split(',');
                int num = int.Parse(data[0]);
                double diff = double.Parse(data[1]);
                double time = double.Parse(data[2]);

                Item item = new Item()
                {
                    BlockNum = num,
                    Diff = diff,
                    Time = time
                };

                if (last10.Count != 0)
                {
                    item.DiffChange = diff - last10.Last().Diff;
                    item.TimeChange = time - last10.Last().Time;
                }

                if (last10.Count == 10) last10.Dequeue();
                last10.Enqueue(item);

                var avg = (from i in last10
                           where i.BlockNum >= 2
                           select i.TimeChange).DefaultIfEmpty(0).Average();
                item.TimeAvg = avg;
                dataList.Add(item);

                var avgDif = (from i in last10
                              where i.BlockNum >= 2
                              select i.DiffChange).DefaultIfEmpty(0).Average();

                // Get time streak
                if (avg >= 30)
                {
                    streakTime++;
                }
                if (avg < 30)
                {
                    if (!streakTimeList.ContainsKey(streakTime))
                    {
                        streakTimeList.Add(streakTime, 1);
                    }
                    else
                    {
                        streakTimeList[streakTime]++;
                    }
                    streakTime = 0;
                }                

                // Get diff streak
                if (avgDif < 0) streakDiff++;
                if (avgDif >= 0)
                {
                    if (!streakDiffList.ContainsKey(streakDiff))
                    {
                        streakDiffList.Add(streakDiff, 1);
                    }
                    else
                    {
                        streakDiffList[streakDiff]++;
                    }
                    streakDiff = 0;
                }
                processed += item.ToString();           
                if (count % 1000 == 0)
                {
                    File.AppendAllText(processFileName, processed);
                    processed = "";
                }
            }
           

            string streakResult = "";
            foreach (int key in streakDiffList.Keys)
            {
                streakResult += key + "," + streakDiffList[key] + "\n";
            }
            File.WriteAllText("streakAvg5.csv", streakResult);


            string streakTimeResult = "";
            foreach (int key in streakTimeList.Keys)
            {
                streakTimeResult += key + "," + streakTimeList[key] + "\n";
            }
            File.WriteAllText("streakTime.csv", streakTimeResult);

            regression(ref dataList);

            Console.WriteLine("Finish");
        }
                
        static void regression(ref HashSet<Item> dataList)
        {
            //Calculate regression line
            double avgX = (from i in dataList
                           where i.BlockNum >= 2
                           select i.BlockNum).DefaultIfEmpty(0).Average();
            double avgY = (from i in dataList
                           where i.BlockNum >= 2
                           select i.TimeAvg).DefaultIfEmpty(0).Average();

            double top = (from i in dataList
                          where i.BlockNum >= 2
                          select (i.BlockNum - avgX) * (i.TimeAvg - avgY)).Sum();

            double bottom = (from i in dataList
                             where i.BlockNum >= 2
                             select (i.BlockNum - avgX) * (i.BlockNum - avgX)).Sum();

            double beta = top / bottom;
            double alpha = avgY - beta * avgX;

        }
    }

    public class Item
    {
        public int BlockNum;
        public double Diff;
        public double Time;
        public double DiffChange;
        public double TimeChange;
        public double TimeAvg;

        public override string ToString()
        {
            return BlockNum + "," + Diff + "," + Time + "," + TimeAvg + "\n";
        }
    }
}
