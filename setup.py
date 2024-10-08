import sys

from setuptools import find_packages, setup

# Base requirements for all platforms
install_requires = [
  "aiohttp==3.10.2",
  "aiohttp_cors==0.7.0",
  "aiofiles==24.1.0",
  "grpcio==1.64.1",
  "grpcio-tools==1.64.1",
  "Jinja2==3.1.4",
  "netifaces==0.11.0",
  "numpy==2.0.0",
  "nvidia-ml-py==12.560.30",
  "pillow==10.4.0",
  "prometheus-client==0.20.0",
  "protobuf==5.27.1",
  "psutil==6.0.0",
  "requests==2.32.3",
  "rich==13.7.1",
  "safetensors==0.4.3",
  "tenacity==9.0.0",
  "tqdm==4.66.4",
  "transformers==4.43.3",
  "uuid==1.30",
  "tinygrad @ git+https://github.com/tinygrad/tinygrad.git@232edcfd4f8b388807c64fb1817a7668ce27cbad",
  "flask==2.0.1",
  "flask-cors==3.0.10",
  "werkzeug==2.0.1",  # Add this line
]

# Add macOS-specific packages if on Darwin (macOS)
if sys.platform.startswith("darwin"):
  install_requires.extend([
    "mlx==0.18.0",
    "mlx-lm==0.18.2",
  ])

extras_require = {
  "linting": [
    "pylint==3.2.6",
    "ruff==0.5.5",
    "mypy==1.11.0",
    "yapf==0.40.2",
  ],
}

setup(
  name="exo",
  version="0.0.1",
  packages=find_packages(),
  install_requires=install_requires,
  extras_require=extras_require,
  package_data={"exo": ["tinychat/**/*"]},
  entry_points={"console_scripts": ["exo = exo.main:run"]},
)
