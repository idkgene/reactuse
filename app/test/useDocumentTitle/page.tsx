"use client"
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";

function TestPage() {
  useDocumentTitle("Welcome to Simple Page");

  return (
    <div>
      Test Page
    </div>
  );
}

export default TestPage;