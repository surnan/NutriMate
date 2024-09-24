function psql-setup {

  #Get User
  printf "Enter PostgreSQL username: "
  read username

  printf "Do you want to grant createdb access to $username? (y/n): "
  read grant_createdb
  # CREATEDB permissions
  if [[ "$grant_createdb" == "y" ]]; then
    createdb_access="CREATEDB"
  else
    createdb_access=""
  fi

  #User Password
  printf "Enter a password for $username: "
  stty -echo
  read password
  stty echo
  echo
  # DB name
  printf "Enter the name of your database: "
  read database_name

  # Create the user with password and grant createdb access if specified
  psql -c "CREATE USER $username WITH PASSWORD '$password' $createdb_access;"

  # Create the database and set the owner to the specified user
  psql -c "CREATE DATABASE $database_name WITH OWNER $username"
  echo
  echo "Setup complete. User '$username' has been created with database '$database_name'."
  echo
  # Make .env files for Python or Javascript
  printf "Do you want me to print your environment variables? (y/n): "
  read make_env
  if [[ "$make_env" == "y" ]]; then
    echo "I can only make these for JS and PY based projects"
    printf "Which project .env do you want? (js/py): "
    read project_type
    if [[ "$project_type" == "py" ]]; then
        printf "DATABASE_URL=postgresql://$username@localhost/$database_name"
        echo
    elif [[ "$project_type" == "js" ]]; then
        echo
        printf "DB_USERNAME=$username"
        echo
        printf "DB_PASSWORD=$password"
        echo
        printf "DB_DATABASE=$database_name"
        echo
        printf "DB_HOST=localhost"
        echo
    fi
  fi
  echo
  echo "Set up done! Have a good day $USER!"

}
