using Microsoft.EntityFrameworkCore;

namespace TaskManager.Data;

public class TaskManagerDataContext : DbContext
{
    private readonly string _connectionString;

    public TaskManagerDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    public DbSet<Job> Jobs { get; set; }
    public DbSet<User> Users { get; set; }
}