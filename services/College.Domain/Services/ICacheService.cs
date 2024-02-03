using College.Shared.Extensions;
using Microsoft.Extensions.Caching.Memory;

namespace College.Domain.Services;

public interface ICacheService<T>
{
    Task<T> GetAsync(string key);

    Task<IList<T>> GetAllAsync(string key);

    Task SetAsync(string key, T item, MemoryCacheEntryOptions options);

    Task SetManyAsync(string key, IList<T> items, MemoryCacheEntryOptions options);

    Task RemoveAsync(string key);
}

public class MemoryCacheService<T>(IMemoryCache memoryCache) : ICacheService<T>
{
    protected readonly IMemoryCache _memoryCache = memoryCache.ThrowIfNull();

    public Task<IList<T>> GetAllAsync(string key)
    {
        _memoryCache.TryGetValue(key, out IList<T> entries);

        return Task.FromResult(entries);
    }

    public virtual Task<T> GetAsync(string key)
    {
        _memoryCache.TryGetValue(key, out T entry);

        return Task.FromResult(entry);
    }

    public virtual async Task RemoveAsync(string key)
    {
        _memoryCache.Remove(key);
        await Task.CompletedTask;
    }

    public virtual async Task SetAsync(string key, T item, MemoryCacheEntryOptions options = null)
    {
        options ??= new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromHours(1));

        _memoryCache.Set(key, item, options);
        await Task.CompletedTask;
    }

    public async Task SetManyAsync(string key, IList<T> items, MemoryCacheEntryOptions options = null)
    {
        options ??= new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromHours(1));

        _memoryCache.Set(key, items, options);
        await Task.CompletedTask;
    }
}