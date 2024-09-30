# Valen Monorepo

## Setup

1. Ensure you have sufficient disk space before proceeding.

2. Clone the repository:
   ```
   git clone <repository-url>
   cd valen-monorepo
   ```

3. If you encounter space issues, run the clean script:
   ```
   bun run clean
   ```

4. Run the install script:
   ```
   ./install.sh
   ```

This will clean up unnecessary files, install all dependencies, and bootstrap the project.

## Available Scripts

- `bun run start`: Start the app
- `bun run android`: Run on Android
- `bun run ios`: Run on iOS
- `bun run web`: Run on web
- `bun run windows`: Run on Windows
- `bun run macos`: Run on macOS
- `bun run lint`: Run linter
- `bun run bootstrap`: Bootstrap the project using Lerna
- `bun run clean`: Clean up node_modules and build artifacts

For more scripts, check the `package.json` file.

## Troubleshooting

If you encounter "No space left on device" errors:

1. Run `bun run clean` to remove unnecessary files.
2. Check your disk space and free up more if needed.
3. Consider using a `.gitignore` file to exclude large directories from version control.

## Running the App

To run the app on different platforms:

- Android: `bun run android`
- iOS: `bun run ios`
- Web: `bun run web`
- Windows: `bun run windows`
- macOS: `bun run macos`

Make sure you have the necessary development environment set up for each platform you want to run the app on.