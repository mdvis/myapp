# ------
# name: start.sh
# author: Deve
# date: 2021-07-06
# ------

work_dir=$(dirname "$0")

cd "${work_dir}" || exit

export FLASK_APP=app
export FLASK_ENV=development

flask run
