package com.api.surveytool.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String response;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;


    public Answer() {}

    public Answer(String response, Question question) {
        this.response = response;
        this.question = question;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
