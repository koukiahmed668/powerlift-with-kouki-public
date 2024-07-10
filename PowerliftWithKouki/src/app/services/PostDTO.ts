export interface PostDTO {
    id?:number;
    title: string;
    body: string;
    timestamp?: string; 
    userId: number; // Ensure userId is part of the DTO
    userFirstName?:string;
    userLastName?:string;
  }
  