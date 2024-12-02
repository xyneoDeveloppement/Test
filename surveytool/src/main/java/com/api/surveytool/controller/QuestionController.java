package com.api.surveytool.controller;

import com.api.surveytool.model.Question;
import com.api.surveytool.model.Answer;
import com.api.surveytool.service.QuestionService;
import com.api.surveytool.service.AnswerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;
    private final AnswerService answerService;

    public QuestionController(QuestionService questionService, AnswerService answerService) {
        this.questionService = questionService;
        this.answerService = answerService;
    }

    // POST endpoint to create a question and link it to a survey
    @PostMapping("/survey/{surveyId}")
    public Question createQuestion(@PathVariable Long surveyId, @RequestBody Question question) {
        return questionService.createQuestion(surveyId, question);
    }

    // GET endpoint to retrieve a question by its ID
    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }

    // PUT endpoint to update an existing question
    @PutMapping("/{id}")
    public Question updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        return questionService.updateQuestion(id, question);
    }

    // DELETE endpoint to delete a question by its ID
    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return "Question successfully deleted";
    }

    // POST endpoint to answer a specific question
    @PostMapping("/{questionId}/answers")
    public Answer createAnswer(@PathVariable Long questionId, @RequestBody Answer answer) {
        return answerService.createAnswer(questionId, answer);
    }

    // GET endpoint to retrieve all answers to a specific question
    @GetMapping("/{questionId}/answers")
    public List<Answer> getAnswersByQuestionId(@PathVariable Long questionId) {
        return answerService.getAnswersByQuestionId(questionId);
    }
}
