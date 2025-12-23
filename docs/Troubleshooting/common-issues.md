# Troubleshooting

This section provides solutions to common issues you might encounter while using the STATUS platform.

## Common Issues

### Installation Issues

#### Problem: Dependencies not installing correctly

**Solution:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Problem: Port already in use

**Solution:**
```bash
# Find and kill the process using the port
lsof -ti:3000 | xargs kill -9
```

### Runtime Issues

#### Problem: Service not starting

**Solution:**
- Check if all required environment variables are set
- Verify that all dependencies are installed
- Review the logs for specific error messages

#### Problem: Connection errors

**Solution:**
- Verify network connectivity
- Check firewall settings
- Ensure services are running on the correct ports

### Configuration Issues

#### Problem: Environment variables not loading

**Solution:**
- Verify the `.env` file exists and is properly formatted
- Ensure environment variables are exported correctly
- Restart the service after making changes

## Getting Help

If you encounter an issue not covered here:

1. Check the [GitHub Issues](https://github.com) for similar problems
2. Review the documentation thoroughly
3. Reach out to the community for support
4. Create a new issue with detailed information about your problem

## Logs and Debugging

Enable debug logging to get more information about issues:

```bash
# Set debug mode
export DEBUG=status:*
```

Review logs in the appropriate location for your deployment.
