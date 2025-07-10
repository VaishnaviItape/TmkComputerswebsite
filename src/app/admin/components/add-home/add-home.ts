import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-home',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-home.html',
  styleUrl: './add-home.css'
})
export class AddHome {


  homeData: any[] = [];
  formData = {
    heading: '',
    quote: '',
    author: '',
    image: ''
  };

  isEditMode = false;
  editIndex: number | null = null;
  editId: number | null = null


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadHomeData();

  }

  loadHomeData() {
    this.http.get<any[]>('public/data/home.json').subscribe({
      next: (data) => (this.homeData = data),
      error: (err) => {
        console.error('Failed to load home.json', err);
        this.homeData = [];
      }
    });
  }

  onSubmit() {
    if (!this.formData.heading || !this.formData.quote || !this.formData.author || !this.formData.image) {
      alert('Please fill all fields');
      return;
    }

    if (this.isEditMode && this.editIndex !== null) {
      // ✅ Update mode
      this.homeData[this.editIndex] = { ...this.formData };
      this.cancelEdit();
    } else {
      // ✅ Add mode
      this.homeData.push({ ...this.formData });
      this.clearForm();
    }
  }


  // onSubmit() {
  //   if (!this.formData.heading || !this.formData.quote || !this.formData.author || !this.formData.image) {
  //     alert('Please fill all fields');
  //     return;
  //   }

  //   if (this.isEditMode && this.editId !== null) {
  //     this.http.put(`http://localhost:3000/home/${this.editId}`, this.formData).subscribe(() => {
  //       this.loadHomeData();
  //       this.cancelEdit();
  //     });
  //   } else {
  //     this.http.post('http://localhost:3000/home', this.formData).subscribe(() => {
  //       this.loadHomeData();
  //       this.clearForm();
  //     });
  //   }
  // }


  editItem(index: number) {
    this.formData = { ...this.homeData[index] };
    this.editIndex = index;
    this.isEditMode = true;
  }

  deleteItem(index: number) {
    this.homeData.splice(index, 1);
    if (this.editIndex === index) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.clearForm();
    this.isEditMode = false;
    this.editIndex = null;
  }

  clearForm() {
    this.formData = {
      heading: '',
      quote: '',
      author: '',
      image: ''
    };
  }

}
