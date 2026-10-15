export interface FormFields {
  titleInput: HTMLInputElement;
  authorInput: HTMLInputElement;
  genreInput: HTMLSelectElement;
  yearInput: HTMLInputElement;
}

export function validateField(field: HTMLInputElement | HTMLSelectElement): boolean {
  const val = field.value.trim();
  const errorEl = document.getElementById(`error-${field.id}`);
  let errorMessage = '';

  if (field.id === 'title') {
    if (val.length < 3) {
      errorMessage = 'Tên sách phải có ít nhất 3 ký tự.';
    }
  } else if (field.id === 'author') {
    if (!val) {
      errorMessage = 'Tác giả là bắt buộc.';
    }
  } else if (field.id === 'genre') {
    if (!val) {
      errorMessage = 'Vui lòng chọn một thể loại.';
    }
  } else if (field.id === 'year') {
    const currentYear = new Date().getFullYear();
    const yearNum = Number(val);
    if (!val || Number.isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
      errorMessage = `Năm xuất bản phải từ 1900 đến ${currentYear}.`;
    }
  }

  if (errorEl) {
    errorEl.textContent = errorMessage;
  }
  return errorMessage === '';
}

export function validateAllFields(fields: FormFields): boolean {
  const v1 = validateField(fields.titleInput);
  const v2 = validateField(fields.authorInput);
  const v3 = validateField(fields.genreInput);
  const v4 = validateField(fields.yearInput);
  return v1 && v2 && v3 && v4;
}
