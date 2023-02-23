# setup guide

## basics

```bash
sudo pacman -S kitty starship fish catfish
```

## paru

```bash
sudo pacman -S --needed base-devel
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
```

## after paru

```
paru -S autotiling neovim btop nerd-fonts-jetbrains-mono vscode-langservers-extracted rhythmbox rustup chromium
```

## manual

set catppuccin-purple as theme

set Jetbrain mono as font

## dooit setup
```bash
paru -S python-pip
git clone https://github.com/kraanzu/dooit.git
cd dooit
pip3 install .
```
add to the .bashrc file

```bash
export PATH="$HOME/.local/bin:$PATH"
```

load into current session using
```
source ~/.bashrc
```
echo @PATH to check

## rust

rustup default stable

<!-- ### mdbook -->
<!-- ```bash -->
<!-- cargo install mdbook -->
<!-- ``` -->

#### extra
[render emoji](https://github.com/shonfeder/emojitsu#use-with-mdbook)

[render latex](https://github.com/lzanini/mdbook-katex) (doesn't work?)

## git
```bash
git config --global user.name "ganhaque"
git config --global user.email "ganhaquegnq@gmail.com"
git config --global init.defaultBranch main
git config --global color.ui auto
git config --global pull.rebase false
```
to verify, use
```bash
git config --get user.name
git config --get user.email
```
### ssh key
see if you have an Ed25519 algorithm SSH key already installed.

```bash
ls ~/.ssh/id_ed25519.pub
ssh-keygen -t ed25519 -C ganhaquegnq@gmail.com
```

just press enter twice

### link key

--go to github -> settings -> SSH and GPG keys -> New SSH key

```bash
cat ~/.ssh/id_ed25519.pub
```

copy and paste in the key field on github

### verify connection
```bash
ssh -T git@github.com
```

### extra

Switching remote URLs from HTTPS to SSH

go to local project

```bash
git remote -v
```
\> origin  https://github.com/USERNAME/REPOSITORY.git (fetch)

\> origin  https://github.com/USERNAME/REPOSITORY.git (push)

Change your remote's URL from HTTPS to SSH with the git remote set-url command.

```bash
git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
```
verify by git remote -v

## misc.

### lavat
```bash
paru -S lavat-git
```

### photoshop
```bash
sudo pacman -S wine winetricks
git clone https://github.com/Gictorbit/photoshopCClinux.git
cd photoshopCClinux
chmod +x setup.sh
./setup.sh
```

### java
```bash
sudo pacman -S jre-openjdk jdk-openjdk
```

### vscode
```bash
paru -S code
```

clipman to maintain copy-paste after application exits | might be useful

