clear
echo 'Welcome to LikAI, an AI-driven biosecurity coach designed for small and medium-sized shrimp farmers 🚀'
echo -e "To start, run the command:\n\n npm run deploy:local\n\n to deploy the project in a local DFX network."

clear
echo 'Welcome to LikAI, an AI-driven biosecurity coach designed for small and medium-sized shrimp farmers 🚀'

echo -e "These are the frontend and backend urls for the local dfx network"
if [ -f ".devcontainer/DEPLOY_URLS.txt" ]; then
  echo -e "\nProject URLs:"
  cat .devcontainer/DEPLOY_URLS.txt
else
  echo -e "\nURLs file not found. Did deployment succeed?"
fi

echo -e "You can visit the links as you wish!"