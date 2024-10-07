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

1. Upgrade to the latest version of MacOS 15.
2. Run `./configure_mlx.sh`. This runs commands to optimize GPU memory allocation on Apple Silicon Macs.


## Documentation

### Example Usage on Multiple MacOS Devices

#### Device 1:

```sh
exo
```

#### Device 2:
```sh
exo
```

That's it! No configuration required - exo will automatically discover the other device(s).

exo starts a ChatGPT-like WebUI (powered by [tinygrad tinychat](https://github.com/tinygrad/tinygrad/tree/master/examples/tinychat)) on http://localhost:8000

For developers, exo also starts a ChatGPT-compatible API endpoint on http://localhost:8000/v1/chat/completions. Example with curls:

```sh
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
     "model": "llama-3.2-3b",
     "messages": [{"role": "user", "content": "What is the meaning of exo?"}],
     "temperature": 0.7
   }'
```

```sh
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
     "model": "llava-1.5-7b-hf",
     "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What are these?"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "http://images.cocodataset.org/val2017/000000039769.jpg"
            }
          }
        ]
      }
    ],
     "temperature": 0.0
   }'
```

### Example Usage on Multiple Heterogenous Devices (MacOS + Linux)

#### Device 1 (MacOS):

```sh
exo --inference-engine tinygrad
```

Here we explicitly tell exo to use the **tinygrad** inference engine.

#### Device 2 (Linux):
```sh
exo
```

Linux devices will automatically default to using the **tinygrad** inference engine.

You can read about tinygrad-specific env vars [here](https://docs.tinygrad.org/env_vars/). For example, you can configure tinygrad to use the cpu by specifying `CLANG=1`.

### Example Usage on a single device with "exo run" command

```sh
exo run llama-3.2-3b
```

With a custom prompt:

```sh
exo run llama-3.2-3b --prompt "What is the meaning of exo?"
```

## Debugging

Enable debug logs with the DEBUG environment variable (0-9).

```sh
DEBUG=9 exo
```

For the **tinygrad** inference engine specifically, there is a separate DEBUG flag `TINYGRAD_DEBUG` that can be used to enable debug logs (1-6).

```sh
TINYGRAD_DEBUG=2 exo
```

## Known Issues

- On some versions of MacOS/Python, certificates are not installed properly which can lead to SSL errors (e.g. SSL error with huggingface.co). To fix this, run the Install Certificates command, usually:

```sh
/Applications/Python 3.x/Install Certificates.command
```

- 🚧 As the library is evolving so quickly, the iOS implementation has fallen behind Python. We have decided for now not to put out the buggy iOS version and receive a bunch of GitHub issues for outdated code. We are working on solving this properly and will make an announcement when it's ready. If you would like access to the iOS implementation now, please email alex@exolabs.net with your GitHub username explaining your use-case and you will be granted access on GitHub.

## Inference Engines

exo supports the following inference engines:

- ✅ [MLX](exo/inference/mlx/sharded_inference_engine.py)
- ✅ [tinygrad](exo/inference/tinygrad/inference.py)
- 🚧 [llama.cpp](TODO)

## Networking Modules

- ✅ [GRPC](exo/networking/grpc)
- 🚧 [Radio](TODO)
- 🚧 [Bluetooth](TODO)

