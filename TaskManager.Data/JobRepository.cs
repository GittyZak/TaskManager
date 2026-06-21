using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Data
{
    public class JobRepository
    {

        private readonly string _connectionString;
        public JobRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Job> GetAll()
        {
            using var context = new TaskManagerDataContext(_connectionString);
            return context.Jobs.ToList();
        }
        public void Add(string title, int userId)
        {
            Console.WriteLine(title);
            using var context = new TaskManagerDataContext(_connectionString);
            context.Jobs.Add(new Job { Status = Status.Available, Title = title, UserId = userId });
            context.SaveChanges();
        }
    }
}
