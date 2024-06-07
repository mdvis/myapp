package utils

import "os"

const (
	DIR_BACKUP_FILES = "./backups/"
	DIR_UPLOAD_FILES = "./uploads/"

	FILE_PERM = 0777
)

func init() {
	_, err := os.Stat(DIR_UPLOAD_FILES)
	if err != nil {
		os.Mkdir(DIR_UPLOAD_FILES, FILE_PERM)
	}

	_, err = os.Stat(DIR_BACKUP_FILES)
	if err != nil {
		os.Mkdir(DIR_BACKUP_FILES, FILE_PERM)
	}
}
